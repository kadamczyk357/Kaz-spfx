declare interface ITestWebPartStrings {
  PropertyPaneDescription: string;
  DescriptionFieldLabel: string;
  BasicPageDecdiption: string;
  AditionalPageDescription: string;
  BasicGroupName: string;
  AditionalGroupName: string;

  ParamNazwaListy: string;
  DescriptionParamNazwaListy: string;
  ErrorParamNazwaListy: string;

  ParamKolumnaTekst: string;
  DescriptionParamKolumnaTekst: string;
  ErrorParamKolumnaTekst: string;

  ParamKolumnaLink: string;
  DescriptionParamKolumnaLink: string;
  ErrorParamKolumnaLink: string;

  ParamKolumnaObrazek: string;
  DescriptionParamKolumnaObrazek: string;
  ErrorParamKolumnaObrazek: string;

  ParamEnableParam: string;
  DescriptionParamEnableParam: string;
  ErrorParamEnableParam: string;
}

declare module 'TestWebPartStrings' {
  const strings: ITestWebPartStrings;
  export = strings;
}
