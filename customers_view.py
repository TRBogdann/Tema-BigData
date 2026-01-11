from datetime import datetime
from numpy._core.umath import NAN
from pymongo.synchronous import mongo_client
from view import View
import streamlit as st
import pandas as pd
import pymongo


class CustomersView(View):
    def __init__(self, customers: pymongo.collection.Collection, editOn=False):
        self.df = pd.DataFrame(list(customers.find()))

        self.customers = customers
        self.editOn = editOn
        self.edited_customers_df = None

        st.subheader("Customers Table")

    def _showEditMode(self):
        self.edited_customers_df = st.data_editor(
            self.df.copy(),
            num_rows="dynamic",
            use_container_width=True,
            column_config={"_id": None},
        )

        if st.button("Sync Customers Collection"):
            self.syncData()

    def _showNormalMode(self):
        st.dataframe(self.df.drop(columns="_id"))
        with st.form("add_customer"):
            first_name = st.text_input("First name")
            last_name = st.text_input("Last name")
            phone = st.text_input("Phone")
            email = st.text_input("Email")

            submitted = st.form_submit_button("Add Customer")

            new_customer = {
                "first_name": first_name,
                "last_name": last_name,
                "phone": phone,
                "email": email,
            }
            if submitted:
                self.customers.insert_one(new_customer)
                st.success("Customer added!")
                st.rerun()

    def _insertData(self):
        if self.edited_customers_df is None:
            return

        for idx, row in self.edited_customers_df.iterrows():
            if row["_id"] is not pd.NA:
                continue

            if len(list(self.customers.find({"email": row["email"]}))) != 0:
                st.error(
                    f"Sync error: Customer with email {row['email']} already exist"
                )
                continue

            self.customers.insert_one(
                {
                    "first_name": row["first_name"],
                    "last_name": row["last_name"],
                    "phone": row["phone"],
                    "email": row["email"],
                }
            )

    def _deleteData(self):
        if self.edited_customers_df is None:
            return

        result = self.df[~self.df["email"].isin(self.edited_customers_df["email"])]

        for _, row in result.iterrows():
            self.customers.delete_many({"email": row["email"]})

    def _updateData(self):
        if self.edited_customers_df is None:
            return

        for idx, row in self.edited_customers_df.iterrows():
            if row["_id"] is pd.NA:
                continue

            self.customers.update_one(
                {"email": row["email"]},
                {
                    "$set": {
                        "first_name": row["first_name"],
                        "last_name": row["last_name"],
                        "phone": row["phone"],
                        "email": row["email"],
                    }
                },
            )
