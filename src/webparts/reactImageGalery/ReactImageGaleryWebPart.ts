import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneToggle
} from '@microsoft/sp-webpart-base';

import * as strings from 'ReactImageGaleryWebPartStrings';
import ReactImageGalery from './components/ReactImageGalery';
import { IReactImageGaleryProps } from './components/IReactImageGaleryProps';

export interface IReactImageGaleryWebPartProps {
  description: string;
  nazwaListy: string;
  kolumnaTekst: string;
  kolumnaLink: string;
  kolumnaObrazek: string;
  enableHeading: boolean;
    // Ades witryny
  webAbsoluteUrl: string;
}
export default class ReactImageGaleryWebPart extends BaseClientSideWebPart<IReactImageGaleryWebPartProps> {

  public render(): void {

    this.properties.webAbsoluteUrl = this.context.pageContext.site.absoluteUrl;
    console.warn(this.properties.webAbsoluteUrl);

    const element: React.ReactElement<IReactImageGaleryProps > = React.createElement(
      ReactImageGalery,this.properties
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
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
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                }),
                PropertyPaneTextField('nazwaListy', {
                  label: strings.ParamNazwaListy
                }),
                PropertyPaneTextField('kolumnaTekst', {
                  label:  strings.ParamKolumnaTekst
                }),
                PropertyPaneTextField('kolumnaLink', {
                  label: strings.ParamKolumnaLink
                }),
                PropertyPaneTextField('kolumnaObrazek', {
                  label: strings.ParamKolumnaObrazek
                })
              ]
            }
          ]
        },
        {
          header: {
            description: strings.CoverflowPageDescription
          },
          groups: [
            {
              groupName: strings.CoverflowGroupName,
              groupFields: [
                PropertyPaneToggle('enableHeading', {
                  label: strings.ParamEnableHeading,
                  checked: true
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
