from flask import Flask, render_template, url_for, request
from flask_cors import CORS, cross_origin
app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
@app.route("/members",methods=["GET"])
@cross_origin()
def members():
    return{
        "members":[
            "Member1",
            "Member2",
            "Member3"
        ]
    }
if __name__ == "__main__":
    app.run(debug=True)