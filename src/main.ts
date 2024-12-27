import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swagger 설정
  const config = new DocumentBuilder()
    .setTitle('API Documentation') // 문서 제목
    .setDescription('API endpoints for the application') // 설명
    .setVersion('1.0') // 버전
    .addTag('users') // 태그 추가
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document); // Swagger UI를 '/api-docs' 경로에 설정
  // 기본 CORS 설정
  app.enableCors({
    origin: 'http://localhost:8001', // 요청을 허용할 출처
    credentials: true, // 쿠키 및 인증 정보 허용
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // 허용할 HTTP 메서드
    allowedHeaders: 'Content-Type,Authorization,X-Requested-With', // 허용할 헤더
  });

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
}
bootstrap();
