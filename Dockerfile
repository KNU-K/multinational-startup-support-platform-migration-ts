# Node.js 기반 이미지를 가져옵니다.
FROM node:20

# 앱 디렉토리를 생성하고 작업 디렉토리로 설정합니다.
WORKDIR /usr/src/app
# 앱 종속성 설치
COPY package*.json ./
RUN npm i
RUN npm i ts-node -g
RUN npm i bcrypt @types/bcrypt
# 앱 소스 복사
COPY . .

# 앱 실행
CMD ["ts-node", "app.ts"]
