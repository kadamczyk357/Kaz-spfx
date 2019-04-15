import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneToggle,
  PropertyPaneDropdown
} from '@microsoft/sp-webpart-base';

import * as strings from 'ReactResponsiveCarouselWebPartStrings';
import ReactResponsiveCarousel from './components/ReactResponsiveCarousel';
// import { IReactResponsiveCarouselProps } from './components/ReactResponsiveCarousel';
import { PropertyFieldNumber } from '@pnp/spfx-property-controls/lib/PropertyFieldNumber';
// import { CalloutTriggers } from '@pnp/spfx-property-controls/lib/PropertyFieldHeader';
// import { PropertyFieldToggleWithCallout } from '@pnp/spfx-property-controls/lib/PropertyFieldToggleWithCallout';
import { PropertyFieldListPicker, PropertyFieldListPickerOrderBy } from '@pnp/spfx-property-controls/lib/PropertyFieldListPicker';
import { PropertyPaneWebPartInformation } from '@pnp/spfx-property-controls/lib/PropertyPaneWebPartInformation';
import { PropertyFieldColorPicker, PropertyFieldColorPickerStyle } from '@pnp/spfx-property-controls/lib/PropertyFieldColorPicker';

export interface IReactResponsiveCarouselWebPartProps {
  description: string;
  nazwaListy: string;
  lists: string | string[]; // Stores the list ID(s)
  kolumnaTekst: string;
  kolumnaLink: string;
  kolumnaObrazek: string;
  showArrows: boolean;
  showStatus: boolean;
  showIndicators: boolean;
  showThumbs: boolean;
  // thumbWidth: number;
  infiniteLoop: boolean;
  selectedItem: number;
  axis: 'horizontal' | 'vertical';
  // verticalSwipe: string;
  width: string;
  useKeyboardArrows: boolean;
  autoPlay: boolean;
  stopOnHover: boolean;
  interval: number;
  transitionTime: number;
  swipeScrollTolerance: number;
  // swipeable: boolean;
  dynamicHeight: boolean;
  emulateTouch: boolean;
  centerMode: boolean;
  centerSlidePercentage: number;
  colorLegendText: string;
  colorLegendLink: string;
  colorLegendBackground: string;

  // Ades witryny
  webAbsoluteUrl: string;
}

export default class ReactResponsiveCarouselWebPart extends BaseClientSideWebPart<IReactResponsiveCarouselWebPartProps> {

  public componentDidMount(): void {
    //Ustawienie wartości domyślnych parametrów webparta
    // to nie działa - dlaczego?
    this.properties.showArrows = true;
  }

  public render(): void {

    this.properties.webAbsoluteUrl = this.context.pageContext.site.absoluteUrl;
    console.warn(this.properties.webAbsoluteUrl);
    this.properties.selectedItem = 0;
    this.properties.nazwaListy = "ObrazyDlaCarousel";
    this.properties.lists = "ObrazyDlaCarousel";
    this.properties.kolumnaTekst = "Tekst";
    this.properties.kolumnaLink = "Link";
    this.properties.kolumnaObrazek = "Obrazek";


    const element: React.ReactElement<IReactResponsiveCarouselWebPartProps > = React.createElement(
      ReactResponsiveCarousel, this.properties
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  private validateStringLength(value: string): string {
    // Tu trzeba dodać jeszcze parametr maksymalnej długości stringu
    if (value === null ||
      value.trim().length === 0) {
      return strings.ErrorEmptyString;
    }

    if (value.length > 50) {
      return strings.ErrorToLongString;
    }

    return '';
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.BasicPageDecdiption
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneWebPartInformation({
                  description: strings.WebPartDescription,
                  moreInfoLink: strings.WebPartExamleUrl,
                  videoProperties: {
                    embedLink: strings.WebPartVideo,
                    properties: { allowFullScreen: true}
                  },
                  key: 'webPartInfoId'
                }),
                // PropertyPaneTextField('description', {
                //   label: strings.DescriptionFieldLabel
                // }),
                PropertyPaneTextField('nazwaListy', {
                  label: strings.ParamNazwaListy
                }),
                PropertyFieldListPicker('lists', {
                  label: strings.ParamNazwaListy,
                  selectedList: this.properties.lists,
                  includeHidden: false,
                  orderBy: PropertyFieldListPickerOrderBy.Title,
                  disabled: false,
                  onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
                  properties: this.properties,
                  context: this.context,
                  onGetErrorMessage: null,
                  deferredValidationTime: 0,
                  key: 'listPickerFieldId'
                }),
                PropertyPaneTextField('kolumnaTekst', {
                  label:  strings.ParamKolumnaTekst,
                  value: this.properties.kolumnaTekst,
                  onGetErrorMessage: this.validateStringLength.bind(this)
                }),
                PropertyPaneTextField('kolumnaLink', {
                  label: strings.ParamKolumnaLink,
                  value: this.properties.kolumnaLink,
                  onGetErrorMessage: this.validateStringLength.bind(this)
                }),
                PropertyPaneTextField('kolumnaObrazek', {
                  label: strings.ParamKolumnaObrazek,
                  value: this.properties.kolumnaObrazek,
                  onGetErrorMessage: this.validateStringLength.bind(this)
                })
              ]
            }
          ]
        },
        {
          header: {
            description: strings.SliderPageDescription
          },
          groups: [
            {
              groupName: strings.SliderGroupName,
              groupFields: [
                PropertyPaneToggle('showArrows', {
                  label: strings.ParamShowArrows,
                  checked: true
                }),
                // PropertyFieldToggleWithCallout('showArrows', {
                //   calloutTrigger: CalloutTriggers.Hover,
                //   key: 'showArrowsFieldId',
                //   label: strings.ParamShowArrows,
                //   calloutContent: React.createElement('p', {}, strings.DescriptionParamShowArrows),
                //   onText: 'ON',
                //   offText: 'OFF',
                //   checked: true // this.properties.showArrows
                // }),
                PropertyPaneToggle('showStatus', {
                  label: strings.ParamShowStatus,
                  checked: true
                }),
                PropertyPaneToggle('showIndicators', {
                  label: strings.ParamShowIndicators,
                  checked: true
                }),
                PropertyPaneToggle('showThumbs', {
                  label: strings.ParamShowThumbs,
                  checked: true
                }),
                // PropertyFieldNumber('thumbWidth', {
                //   key: 'thumbWidth',
                //   label: strings.ParamThumbWidth,
                //   description: strings.DescriptionParamThumbWidth,
                //   value: this.properties.thumbWidth,
                //   maxValue: 100,
                //   minValue: 10,
                //   disabled: false
                // }),
                PropertyPaneToggle('infiniteLoop', {
                  label: strings.ParamInfiniteLoop,
                  checked: false
                }),
                PropertyFieldNumber('selectedItem', {
                  key: 'selectedItem',
                  label: strings.ParamSelectedItem,
                  description: strings.DescriptionParamSelectedItem,
                  value: this.properties.selectedItem,
                  maxValue: 100,
                  minValue: 0,
                  disabled: false
                  // onGetErrorMessage: (value: number) => {
                  //   if (value % 2 !== 0) {
                  //     return strings.ErrorNumberControl;
                  //   }
                  //   return '';
                  // }
                }),
                PropertyPaneDropdown('axis', {
                  label: strings.ParamAxis,
                  selectedKey: 'horizontal',
                  options: [
                    {key: 'horizontal', text: strings.OptionHorizontalParamAxis},
                    {key: 'vertical', text: strings.OptionVerticalParamAxis}
                  ]
                }),
                // PropertyPaneDropdown('verticalSwipe', {
                //   label: strings.ParamVerticalSwipe,
                //   selectedKey: 'standard',
                //   options: [
                //     {key: 'standard', text: strings.OptionStandardParamVerticalSwipe},
                //     {key: 'natural', text: strings.OptionNaturalParamVerticalSwipe}
                //   ]
                // }),
                // PropertyPaneTextField('width', {
                //   label: strings.ParamWidth
                // }),
                PropertyPaneToggle('useKeyboardArrows', {
                  label: strings.ParamUseKeyboardArrows,
                  checked: false
                }),
                PropertyPaneToggle('autoPlay', {
                  label: strings.ParamAutoPlay,
                  checked: false
                }),
                PropertyPaneToggle('stopOnHover', {
                  label: strings.ParamStopOnHover,
                  checked: true
                }),
                PropertyFieldNumber('interval', {
                  key: 'interval',
                  label: strings.ParamInterval,
                  description: strings.DescriptionParamInterval,
                  value: this.properties.interval,
                  maxValue: 10000,
                  minValue: 10,
                  disabled: false
                  // onGetErrorMessage: (value: number) => {
                  //   if (value % 2 !== 0) {
                  //     return strings.ErrorNumberControl;
                  //   }
                  //   return '';
                  // }
                }),
                PropertyFieldNumber('transitionTime', {
                  key: 'transitionTime',
                  label: strings.ParamTransitionTime,
                  description: strings.DescriptionParamTransitionTime,
                  value: this.properties.transitionTime,
                  maxValue: 1000,
                  minValue: 10,
                  disabled: false
                }),
                PropertyFieldNumber('swipeScrollTolerance', {
                  key: 'swipeScrollTolerance',
                  label: strings.ParamSwipeScrollTolerance,
                  description: strings.DescriptionParamSwipeScrollTolerance,
                  value: this.properties.swipeScrollTolerance,
                  maxValue: 100,
                  minValue: 1,
                  disabled: false
                }),
                // PropertyPaneToggle('swipeable', {
                //   label: strings.ParamSwipeable,
                //   checked: true
                // }), - nie ma w parametrach carousel
                PropertyPaneToggle('dynamicHeight', {
                  label: strings.ParamDynamicHeight,
                  checked: false
                }),
                PropertyPaneToggle('emulateTouch', {
                  label: strings.ParamEmulateTouch,
                  checked: false
                }),
                PropertyPaneToggle('centerMode', {
                  label: strings.ParamCenterMode,
                  checked: false
                }),
                PropertyFieldNumber('centerSlidePercentage', {
                  key: 'centerSlidePercentage',
                  label: strings.ParamCenterSlidePercentage,
                  description: strings.DescriptionParamCenterSlidePercentage,
                  value: this.properties.centerSlidePercentage,
                  maxValue: 100,
                  minValue: 1,
                  disabled: false
                })
              ]
            }
          ]
        },
        {
          header: {
            description: strings.ColorPageDescription
          },
          groups: [
            { // Legend : textcolor linkcolor backgroundcolor
              groupName: strings.ColorGroupName,
              groupFields: [
                PropertyFieldColorPicker('colorLegendText', {
                  label: strings.ParamKolumnaColorLegendText,
                  selectedColor: this.properties.colorLegendText,
                  onPropertyChange: this.onPropertyPaneFieldChanged,
                  properties: this.properties,
                  disabled: false,
                  isHidden: false,
                  alphaSliderHidden: false,
                  style: PropertyFieldColorPickerStyle.Inline,
                  iconName: 'Precipitation',
                  key: 'colorFieldId'
                }),
                PropertyFieldColorPicker('colorLegendLink', {
                  label: strings.ParamKolumnaColorLegendLink,
                  selectedColor: this.properties.colorLegendLink,
                  onPropertyChange: this.onPropertyPaneFieldChanged,
                  properties: this.properties,
                  disabled: false,
                  isHidden: false,
                  alphaSliderHidden: false,
                  style: PropertyFieldColorPickerStyle.Inline,
                  iconName: 'Precipitation',
                  key: 'colorFieldId'
                }),
                PropertyFieldColorPicker('colorLegendBackground', {
                  label: strings.ParamKolumnaColorLegendBackground,
                  selectedColor: this.properties.colorLegendBackground,
                  onPropertyChange: this.onPropertyPaneFieldChanged,
                  properties: this.properties,
                  disabled: false,
                  isHidden: false,
                  alphaSliderHidden: false,
                  style: PropertyFieldColorPickerStyle.Inline,
                  iconName: 'Precipitation',
                  key: 'colorFieldId'
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
