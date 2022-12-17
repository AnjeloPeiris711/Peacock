from flask import Flask, render_template, url_for, request,json
from flask_cors import CORS, cross_origin
app = Flask(__name__)
app.config['SECRET_KEY'] = 'the quick brown fox jumps over the lazy   dog'
app.config['CORS_HEADERS'] = 'Content-Type'
cors = CORS(app, resources={r"/members": {"origins": "http://localhost:port"}})
@app.route("/members",methods=["GET"])
@cross_origin(origin='localhost',headers=['Content- Type','Authorization'])
def members():
    return{
        "members":[
            "Member1",
            "Member2",
            "Member3"
        ]
    }
# @app.route("/ssh",methods=["POST"])
# def ssh():
#     request_data = request.form.to_dict()
#     print(request_data)
if __name__ == "__main__":
    app.run(debug=True)