declare interface IReactCoverflowWebPartStrings {
  PropertyPaneDescription: string;
  DescriptionFieldLabel: string;
  BasicPageDecdiption: string;
  CoverflowPageDescription: string;
  BasicGroupName: string;
  CoverflowGroupName: string;

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

  ParamEnableHeading: string;
  DescriptionParamEnableHeading: string;
  ErrorParamEnableHeading: string;
}


declare module 'ReactCoverflowWebPartStrings' {
  const strings: IReactCoverflowWebPartStrings;
  export = strings;
}
