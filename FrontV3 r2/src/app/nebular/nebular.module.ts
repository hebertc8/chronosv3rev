import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import {
  NbLayoutModule,
  NbCardModule,
  NbButtonModule,
  NbInputModule,
  NbUserModule,
  NbIconModule,
  NbToggleModule,
  NbActionsModule,
  NbSpinnerModule,
  NbContextMenuModule,
  NbDialogModule,
  NbMenuModule,
  NbStepperModule,
  NbListModule,
  NbCheckboxModule,
  NbToastrModule,
  NbTooltipModule,
  NbRouteTabsetModule,
  NbSelectModule,
  NbDatepickerModule,
  NbAccordionModule,
  NbBadgeModule,
  NbProgressBarModule,
  NbPopoverModule,
  NbWindowModule,
  NbTabsetModule,
  NbRadioModule,
} from '@nebular/theme';



@NgModule({
  exports: [
   // NbThemeModule,
    NbMenuModule,
    NbLayoutModule,
    NbEvaIconsModule,
    NbCheckboxModule,
    NbStepperModule,
    NbCardModule,
    NbButtonModule,
    NbContextMenuModule,
    NbUserModule,
    NbInputModule,
    NbIconModule,
    NbListModule,
    NbToggleModule,
    NbActionsModule,
    NbSpinnerModule,
    NbTooltipModule,
    NbToastrModule,
    NbDialogModule,
    NbRouteTabsetModule,
    NbDatepickerModule,
    NbSelectModule,
    NbAccordionModule,
    NbBadgeModule,
    NbProgressBarModule,
    NbPopoverModule,
    NbWindowModule,
    NbTabsetModule,
    NbRadioModule,
  ],
  imports: [
    CommonModule,
    NbAccordionModule,
    NbDatepickerModule.forRoot(),
   // NbThemeModule.forRoot({ name: 'dark' }),
    NbMenuModule.forRoot(),
    NbLayoutModule,
    NbEvaIconsModule,
    NbCheckboxModule,
    NbRouteTabsetModule,
    NbStepperModule,
    NbDialogModule.forRoot(),
    NbCardModule,
    NbButtonModule,
    NbContextMenuModule,
    NbUserModule,
    NbInputModule,
    NbIconModule,
    NbListModule,
    NbToggleModule,
    NbActionsModule,
    NbSpinnerModule,
    NbTooltipModule,
    NbToastrModule.forRoot(),
    NbDialogModule.forChild(),
    NbSelectModule,
    NbBadgeModule,
    NbProgressBarModule,
    NbPopoverModule,
    NbWindowModule.forRoot(),
    NbTabsetModule,
    NbRadioModule,
  ],
  // providers: [
  //   ...NbThemeModule.forRoot(
  //     {
  //       name: 'default',
  //     },
  //     [ DEFAULT_THEME, COSMIC_THEME, CORPORATE_THEME, DARK_THEME ],
  //   ).providers,
  // ],
})
export class NebularModule {
  // static forRoot(): ModuleWithProviders<NebularModule> {
  //   return {
  //     ngModule: NebularModule,
  //     providers: [
  //       ...NbThemeModule.forRoot(
  //         {
  //           name: 'default',
  //         },
  //         [ DEFAULT_THEME, COSMIC_THEME, CORPORATE_THEME, DARK_THEME ],
  //       ).providers,
  //     ],
  //   };
  // }
}
