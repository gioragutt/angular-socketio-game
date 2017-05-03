import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AioServerConnectionService } from './aio-server-connection.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})
export class AioServerConnectionModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AioServerConnectionModule,
      providers: [AioServerConnectionService]
    };
  }
}
