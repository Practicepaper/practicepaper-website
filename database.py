from sqlalchemy import create_engine, text

engine=create_engine("mysql+pymysql://root:@localhost/test?charset=utf8mb4")

