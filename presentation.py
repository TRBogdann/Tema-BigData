import streamlit as st
import pandas as pd
import pymongo
from dotenv import load_dotenv
import os
from urllib.parse import quote_plus
from movies_view import MoviesView
from prices_view import PricesView
from customers_view import CustomersView
from tickets_view import TicketsView
import altair

load_dotenv()


def getDiff(df1, df2, on=""):
    common = df1.merge(df2, on=[on])
    return df1[(~df1[on].isin(common[on]))]


username = quote_plus(str(os.getenv("MONGO_USER")))
password = quote_plus(str(os.getenv("MONGO_PASS")))
client = pymongo.MongoClient(
    f"mongodb+srv://{username}:{password}@mongo.mpjqs8l.mongodb.net/?appName=Mongo"
)
db = client["proiect"]

customers = db["customers"]
prices = db["prices"]
movies = db["movies"]
tickets = db["tickets"]

print(type(customers))

st.title("Cinema Dashboard")

st.subheader("Settings")
edit_on = st.toggle("Edit Mode")


moviesView = MoviesView(movies, edit_on)
moviesView.show()

pricesView = PricesView(prices, edit_on)
pricesView.show()

customersView = CustomersView(customers, edit_on)
customersView.show()

ticketsView = TicketsView(tickets, customers)
ticketsView.show()

st.subheader("Revenue per movie")

pipeline_movie_revenue = [
    {
        "$lookup": {
            "from": "prices",
            "localField": "ticket_type",
            "foreignField": "ticket_type",
            "as": "price",
        }
    },
    {"$unwind": "$price"},
    {
        "$group": {
            "_id": "$movie",
            "total": {"$sum": "$price.price"},
            "nOfTickets": {"$sum": 1},
        }
    },
    {"$project": {"_id": 0, "total": 1, "nOfTickets": 1, "movie": "$_id"}},
]

df_movie_revenue = pd.DataFrame(list(tickets.aggregate(pipeline_movie_revenue)))
st.dataframe(df_movie_revenue)
st.write(f"Revenue: {df_movie_revenue['total'].sum()}")
st.write(f"Tickets sold: {df_movie_revenue['nOfTickets'].sum()}")
st.bar_chart(df_movie_revenue, x="movie", y="total")
st.bar_chart(df_movie_revenue, x="movie", y="nOfTickets")

pipeline_rank = [
    {"$group": {"_id": "$movie", "totalTickets": {"$sum": 1}}},
    {"$sort": {"totalTickets": -1}},
    {
        "$setWindowFields": {
            "sortBy": {"totalTickets": -1},
            "output": {"rank": {"$rank": {}}},
        }
    },
]

df_top = pd.DataFrame(list(tickets.aggregate(pipeline_rank)))

df_top.rename(columns={"_id": "movie"}, inplace=True)

st.subheader("Movie Ticket Rankings")

st.write("Bar chart showing total tickets sold per movie:")

chart = (
    altair.Chart(df_top)
    .mark_bar()
    .encode(
        x=altair.X("movie:N", sort="-y", title="Movie"),
        y=altair.Y("totalTickets:Q", title="Total Tickets"),
        tooltip=["movie", "totalTickets", "rank"],
    )
    .properties(width=700, height=400)
)

st.altair_chart(chart)


st.subheader("Revenue and tickets sold per genre")
pipeline_genre = [
    {
        "$lookup": {
            "from": "prices",
            "localField": "ticket_type",
            "foreignField": "ticket_type",
            "as": "price",
        }
    },
    {
        "$lookup": {
            "from": "movies",
            "localField": "movie",
            "foreignField": "name",
            "as": "movie",
        }
    },
    {"$unwind": "$price"},
    {"$unwind": "$movie"},
    {"$unwind": "$movie.genre"},
    {
        "$group": {
            "_id": "$movie.genre",
            "ticket_count": {"$sum": 1},
            "revenue": {"$sum": "$price.price"},
        }
    },
    {"$project": {"_id": 0, "genre": "$_id", "ticket_count": 1, "revenue": 1}},
    {"$sort": {"revenue": -1, "ticket_count": -1}},
]

df_genre_revenue = pd.DataFrame(list(tickets.aggregate(pipeline_genre)))
st.dataframe(df_genre_revenue)
chart = (
    altair.Chart(df_genre_revenue)
    .mark_bar()
    .encode(
        x=altair.X("genre:N", sort="-y", title="Genre"),
        y=altair.Y("revenue:Q", title="revenue"),
        tooltip=["genre", "revenue"],
    )
    .properties(width=700, height=400)
)

st.altair_chart(chart)
