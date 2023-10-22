import torch 
from flask import Flask, request, jsonify
import time
app = Flask(__name__)

@app.route('/')
def home():
    return 'Home Page'

@app.route('/upload', methods=['POST'])
def upload_file():
    cookList = {'bean sprouts':"콩나물", 'beef':"소고기", 'chicken':"닭고기", 'egg':"계란", 'fork':"돼지고기", 'garlic':"마늘", 'green onion':"대파", 'kimchi':"김치", 'onion':"양파", 'photato':"감자", 'spam':"스팸"}
    if 'photo' in request.files:
        photo = request.files['photo']
        print(photo.filename)
        test = []
        test.append("test")
        photo.save('./img/' + photo.filename)
        time.sleep(3)

        model = torch.hub.load('ultralytics/yolov5', 'custom', path='best3.pt')
        img = "img/" + photo.filename
        results = model(img)

        results.save()
        labels = results.pandas().xyxy[0]['name'].tolist()
        confidences = results.pandas().xyxy[0]['confidence'].tolist()
        print(labels,confidences)

        if len(labels) == 0 :
            labels.append("아무거나 한식")
        else: 
            for i in range(len(labels)):
                labels[i] = cookList[labels[i]]
        return labels
        
    else:
        return jsonify({'error': '사진이 업로드되지 않았습니다.'})


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
# 스타트 명령어 flask run --host=0.0.0.0 --port=5000