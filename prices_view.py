from datetime import datetime
from numpy._core.umath import NAN
from pymongo.synchronous import mongo_client
from view import View
import streamlit as st
import pandas as pd
import pymongo


class PricesView(View):
    def __init__(self, prices: pymongo.collection.Collection, editOn=False):
        self.df = pd.DataFrame(list(prices.find()))

        self.prices = prices
        self.editOn = editOn
        self.edited_prices_df = None

        st.subheader("Prices Table")

    def _showEditMode(self):
        self.edited_prices_df = st.data_editor(
            self.df.copy(),
            num_rows="dynamic",
            use_container_width=True,
            column_config={"_id": None},
        )

        if st.button("Sync Prices Collection"):
            self.syncData()

    def _showNormalMode(self):
        st.dataframe(self.df.drop(columns="_id"))
        with st.form("add_price"):
            ticket_type = st.text_input("Ticket type")
            price = st.number_input("Price", 0)

            submitted = st.form_submit_button("Add Ticket Type")

            new_price = {"ticket_type": ticket_type, "price": price}
            if submitted:
                self.prices.insert_one(new_price)
                st.success("Price added!")
                st.rerun()

    def _insertData(self):
        if self.edited_prices_df is None:
            return

        for idx, row in self.edited_prices_df.iterrows():
            if row["_id"] is not pd.NA:
                continue

            if len(list(self.prices.find({"ticket_type": row["ticket_type"]}))) != 0:
                st.error(f"Sync error: Ticket type {row['ticket_type']} already exist")
                continue

            self.prices.insert_one(
                {"ticket_type": row["ticket_type"], "price": row["price"]}
            )

    def _deleteData(self):
        if self.edited_prices_df is None:
            return

        result = self.df[
            ~self.df["tycket_type"].isin(self.edited_prices_df["ticket_type"])
        ]

        for _, row in result.iterrows():
            self.prices.delete_many({"ticket_type": row["ticket_type"]})

    def _updateData(self):
        if self.edited_prices_df is None:
            return

        for idx, row in self.edited_prices_df.iterrows():
            if row["_id"] is pd.NA:
                continue

            self.prices.update_one(
                {"ticket_type": row["ticket_type"]},
                {"$set": {"ticket_type": row["ticket_type"], "price": row["price"]}},
            )
