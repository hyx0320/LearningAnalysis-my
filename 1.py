from flask import Flask
from flask import redirect #重定向
from flask import request  #请求
from flask import jsonify  #json格式化
from flask import session  #会话

app = Flask(__name__)
app.secret_key = 'your_secret_key'  # 设置一个密钥用于会话加密
@app.route('/', methods=['GET'])
def hello_world():
    return 'Hello, World!'


@app.route('/greet/<string:name>')
def greet(name):
    return f'Hello, {name}!'


@app.route("/baidu")
def baidu():
    return redirect("https://www.baidu.com")




@app.route('/test/post', methods=['POST'])
def post():
    myjosn = request.get_json()
    print(myjosn)
    return jsonify({"status": "success", "data": myjosn})



@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    if not username or not password:
        return jsonify({"status": "error", "message": "Username and password are required!"}), 400
    if username == '789' and password == '123':
        session['user'] = username
        session['password'] = password
        return jsonify({"status": "success", "message": "Logged in successfully!"})
    else:
        return jsonify({"status": "error", "message": "Invalid credentials!"}), 401
    
@app.route('/session/check', methods=['GET'])
def check_session():
    if session.get('user'):
        return jsonify({"status": "success", "message": f"User {session['user']} is logged in."})
    else:
        return jsonify({"status": "error", "message": "No user is logged in."}), 401  


@app.route('/logout', methods=['GET'])
def logout():
    session.clear()
    return jsonify({"status": "success", "message": "Logged out successfully!"})






app.run(host="0.0.0.0")