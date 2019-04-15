import * as React from 'react';
import styles from './ReactAnimatedSlider.module.scss';
import { IReactAnimatedSliderProps } from './IReactAnimatedSliderProps';
import { escape } from '@microsoft/sp-lodash-subset';

// https://www.npmjs.com/package/react-animated-slider

import pnp from 'sp-pnp-js';

import Slider from 'react-animated-slider';
import 'react-animated-slider/build/horizontal.css';
import 'normalize.css/normalize.css';
import './slider-animations.css';
import './styles.css';

export interface IReactAnimatedSlider {
  // Słabe typowanie
  listItems: any[];
}


export default class ReactAnimatedSlider extends React.Component<IReactAnimatedSliderProps, {}> {

  public state: IReactAnimatedSlider = {
    listItems: []
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
        this.setState({ listItems: items });
      });
  }

  public render(): React.ReactElement<IReactAnimatedSliderProps> {

    const anyParameters: boolean = this.state.listItems.length > 0;
    console.log(this.state.listItems.length);
    console.log(anyParameters);

    return (
      <div>
        {
          anyParameters ? (
            this.displayAnimatedSlider()
          ) : (
              <h3>Ustaw parametry web parta</h3>
            )
        }
      </div>
    );
  }

  private displayAnimatedSlider = () => (
    <div>
      <Slider className="slider-wrapper">
        {this.state.listItems.map((item, index) =>
          <div
            key={index}
            className="slider-content"
            style={{ background: `url('${this.prefix + item.FileLeafRef}') no-repeat center center` }}
          >
            <div className="inner">
              <h1>{item.Tekst}</h1>
              <p>{item.Link.Description}</p>
              <button>{item.Tekst}</button>
            </div>
            <section>
              {/* <img src={item.userProfile} alt={item.user} /> */}
              <span>
                moj tekst
              {/* Posted by <strong>{item.user}</strong> */}
              </span>
            </section>

            <h2>{item.Tekst}</h2>
            <div>{item.Link.Url}</div>
          </div>)}
      </Slider>
    </div>
  )
}
