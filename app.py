from flask import Flask, render_template, jsonify
from database import engine
from sqlalchemy import text


app = Flask(__name__)


def load_questions(quiz_name):
  with engine.connect() as conn:
    query=text("select id from  wp_mtouchquiz_quiz where name=:quiz_name")
    quiz_id=conn.execute(query,{'quiz_name': quiz_name}).scalar()
    query=text("select * from  wp_mtouchquiz_question where quiz_id=:quiz_id")
    allquestions=conn.execute(query,{'quiz_id':quiz_id})
    questions=[]
    question_id_list=[]
    column_names = allquestions.keys()
    for question in allquestions.all():
        question_dict = dict(zip(allquestions.keys(), question))
        #questions.append(dict(zip(column_names, question)))
        question_id = question_dict['ID']
        query=text("select * from  wp_mtouchquiz_answer where question_id=:ques_id")
        allanswers=conn.execute(query,{'ques_id':question_id})
        question_dict['answers'] = [dict(zip(allanswers.keys(), answer)) for answer in allanswers]
        questions.append(question_dict)
    #print(questions)

    return questions
  
@app.route('/')
def hello_world():
  questions=load_questions("Algorithm")
  
  
  #for question in questions:
  for item in questions:
    print(f"ID: {item['ID']}")
    print(f"Question: {item['question']}")
    
    # Check if the dictionary has 'answers' key
    if 'answers' in item:
        for answer in item['answers']:
            if answer['correct'] == 1:
               print("ANSWER CORRECT")
            else:
               print("answer is wrong ")
    
    print("\n")
   


     

  return "hello world"

@app.route('/gate-cse/<quiz_name>')
def lsit_ques(quiz_name):
  quiz_name=quiz_name.replace('-', ' ')
  questions=load_questions(quiz_name)
  return render_template('home.html', questions=questions, quiz_name=quiz_name)



if __name__ == "__main__":
  app.run(debug=True)
