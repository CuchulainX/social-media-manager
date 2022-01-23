import {
  Body,
  Controller,
  Get,
  HttpException,
  Post,
  Req,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { SNSPost, SocialProvider, User } from '@kumi-arts/core';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
import {} from 'multer';
import { ImgurClient } from '@kumi-arts/sns-client';
import { AuthService } from './auth.service';
import { clientForRequest } from './shared';

@Controller([
  SocialProvider.FACEBOOK,
  SocialProvider.INSTAGRAM,
  SocialProvider.REDDIT,
  SocialProvider.TWITTER,
  SocialProvider.IMGUR,
])
export class ImgurController {
  constructor(private readonly auth: AuthService) {}

  @Get('user')
  async user(@Req() req: Request): Promise<User> {
    const client = clientForRequest(req, this.auth);

    return client.getUser().catch((e) => {
      throw new HttpException(`Failed to get user data: ${e.message}`, 401);
    });
  }

  @Post('post')
  async post(@Req() req: Request, @Body() body: SNSPost) {
    const client = clientForRequest(req, this.auth);
    return client.postMedia(body);
  }

  @Post('upload')
  @UseInterceptors(FilesInterceptor('images'))
  async upload(
    @Req() req: Request,
    @UploadedFiles() images: Express.Multer.File[]
  ) {
    const client = clientForRequest(req, this.auth);
    return Promise.all(
      images.map((i) => client.uploadImage(i.buffer, i.originalname))
    );
  }
}
