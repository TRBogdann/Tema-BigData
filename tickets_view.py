from datetime import datetime
from numpy._core.umath import NAN
from pymongo.synchronous import mongo_client
from view import View
import streamlit as st
import pandas as pd
import pymongo


class TicketsView(View):
    def __init__(
        self,
        tickets: pymongo.collection.Collection,
        customers: pymongo.collection.Collection,
        editOn=False,
    ):
        movies = [""] + tickets.distinct("movie")
        selected_movie = "" if editOn else st.selectbox("Select movie", movies)

        pipeline = [
            {"$match": {"movie": selected_movie}}
            if selected_movie != ""
            else {"$match": {}},
            {"$unwind": "$cinema"},
            {
                "$project": {
                    "customer": 1,
                    "movie": 1,
                    "ticket_type": 1,
                    "date": 1,
                    "row": 1,
                    "seat": 1,
                    "room": 1,
                    "cinema_name": "$cinema.name",
                    "cinema_city": "$cinema.city",
                    "_id": 1,
                }
            },
        ]

        self.df = pd.DataFrame(list(tickets.aggregate(pipeline)))

        self.tickets = tickets
        self.customers = customers
        self.editOn = editOn
        self.edited_tickets_df = None

        st.subheader("Tickets Table")

    def _showNormalMode(self):
        st.dataframe(self.df.drop(columns="_id"))
        with st.form("add_ticket"):
            customer_email = st.selectbox(
                "Customer Email", self.customers.distinct("email")
            )
            movie = st.selectbox("Movie", self.tickets.distinct("movie"))
            ticket_type = st.selectbox("Ticket type", ["adult", "child", "senior"])
            date = st.date_input("Show date")
            time = st.time_input("Show time")

            room = st.number_input("Room", min_value=1, step=1)
            row = st.number_input("Row", min_value=1, step=1)
            seat = st.number_input("Seat", min_value=1, step=1)

            cinema_name = st.text_input("Cinema name")
            cinema_city = st.text_input("Cinema city")

            submitted = st.form_submit_button("Add ticket")

            if submitted:
                customer_id = self.customers.find_one({"email": customer_email})["_id"]
                print(customer_id)

                new_ticket = {
                    "customer": customer_id,
                    "movie": movie,
                    "ticket_type": ticket_type,
                    "date": datetime.combine(date, time),
                    "row": row,
                    "seat": seat,
                    "room": room,
                    "cinema": {"name": cinema_name, "city": cinema_city},
                }

                self.tickets.insert_one(new_ticket)
                st.success("Ticket added!")
                st.rerun()

    def _showEditMode(self):
        pass

    def _insertData(self):
        pass

    def _deleteData(self):
        pass

    def _updateData(self):
        pass
