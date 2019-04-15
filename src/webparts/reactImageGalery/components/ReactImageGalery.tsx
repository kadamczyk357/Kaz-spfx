import * as React from 'react';
import styles from './ReactImageGalery.module.scss';
import { IReactImageGaleryProps } from './IReactImageGaleryProps';
import { escape } from '@microsoft/sp-lodash-subset';

// https://www.npmjs.com/package/react-image-gallery
// https://github.com/xiaolin/react-image-gallery/blob/master/example/app.js
import pnp from 'sp-pnp-js';

import "react-image-gallery/styles/css/image-gallery.css";
import { ImageGallery } from 'react-image-gallery';


export interface IReactImageGaleryState {
  // Słabe typowanie
  listItemsImageGalery: any[];
}
export default class ReactImageGalery extends React.Component<IReactImageGaleryProps, IReactImageGaleryState> {

  public state: IReactImageGaleryState = {
    listItemsImageGalery: []
  };

  private prefix = `${this.props.webAbsoluteUrl}/${this.props.nazwaListy}/`;

  public componentDidMount(): void {
    console.log(this.prefix);

    pnp.sp.web.lists
      .getByTitle(this.props.nazwaListy)
      .items
      .select(this.props.kolumnaTekst, this.props.kolumnaLink, 'FileLeafRef')
      .get().then((items: any[]) => {
        console.log(items);
        this.setState({ listItemsImageGalery: items });
      });
  }

  public render(): React.ReactElement<IReactImageGaleryProps> {

    const anyParameters: boolean = this.state.listItemsImageGalery.length > 0;

    return (
      <div>
        {
          anyParameters ? (
            this.displayImageGalery()
          ) : (
              <h3>Ustaw parametry web parta</h3>
            )
        }
      </div>
    );
  }

  private displayImageGalery = () => (
    <ImageGallery items={[
        this.state.listItemsImageGalery.map((item, index) => (
          {
            original: this.prefix + item.FileLeafRef,
            thumbnail: this.prefix + item.FileLeafRef,
          }
        ))
    ]}>
    </ImageGallery>
  )
}
