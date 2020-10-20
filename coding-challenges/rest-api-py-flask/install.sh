#! /bin/bash

# add python virtual env
python3 -m venv env

# activate virtual env
source env/bin/activate

# install required libraries
pip install -r requirements.txt

# start webserver
python manage.py runserver