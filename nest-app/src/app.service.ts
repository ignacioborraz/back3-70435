import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return '<h1>Hello World!</h1>';
  }
  getInfo(): string {
    return `
    <ul>
      <li>"/" pagina principal</li>
      <li>"/info" pagina con las diferentes rutas</li>
      <li>"/users" página con los diferentes usuarios de la app</li>
    </ul>
    `;
  }
}
