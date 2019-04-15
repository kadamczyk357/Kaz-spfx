import * as React from 'react';
//import styles from './ReactResponsiveCarousel.module.scss';
//import { escape } from '@microsoft/sp-lodash-subset';

//import { Label } from 'office-ui-fabric-react/lib/Label';
//import { DefaultButton, IButtonProps } from 'office-ui-fabric-react/lib/Button';

import pnp from 'sp-pnp-js';

// https://www.npmjs.com/package/react-responsive-carousel
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import { IReactResponsiveCarouselWebPartProps } from '../ReactResponsiveCarouselWebPart';

export interface IReactResponsiveCarouselState {
  // Słabe typowanie
  listItemsCarousel: any[];
}

export default class ReactResponsiveCarousel extends React.Component<IReactResponsiveCarouselWebPartProps, IReactResponsiveCarouselState> {

  public state: IReactResponsiveCarouselState = {
    listItemsCarousel: []
  };

  private prefix = `${this.props.webAbsoluteUrl}/${this.props.nazwaListy}/`;

  public componentDidMount(): void {
    console.log(this.prefix+'aaa');
    // pnp.sp.web.lists.getByTitle(this.props.nazwaListy).items.select("Tekst", "Link", "FileLeafRef").get().then((items: ICarouselItem[]) => {
    //   console.log(items);
    //   this.setState({listItemsCarousel: items} );
    // });
    //console.log(this.props.lists);
    //(this.props.lists.constructor === String) && console.log('its a string');
    //(this.props.lists.constructor === Array) && console.log('its an array');
    console.log(this.props.colorLegendText);
    console.log(this.props.colorLegendLink);
    console.log(this.props.colorLegendBackground);


    pnp.sp.web.lists
      .getByTitle(this.props.lists.toString())
      .items
      .select(this.props.kolumnaTekst, this.props.kolumnaLink, 'FileLeafRef', this.props.kolumnaObrazek)
      //.top(3)
      // .where(this.props.kolumnaObrazek != null)
      .get().then((items: any[]) => {
        console.log(items);
        this.setState({ listItemsCarousel: items });
      });
  }

  public render(): React.ReactElement<IReactResponsiveCarouselWebPartProps> {

    const anyParameters: boolean = this.state.listItemsCarousel.length > 0;

    return (
      <div>
        {
          anyParameters ? (
            this.displayCarousel()
          ) : (
            <h3>Ustaw parametry web parta</h3>
          )
        }
      </div>
    );
  }

  private displayCarousel = () => (
    // ??? Jak budować atrybuty < carousel .....
    <Carousel   showArrows = {this.props.showArrows}
                showStatus = {this.props.showStatus}
                showIndicators = {this.props.showIndicators}
                showThumbs = {this.props.showThumbs}
                // thumbWidth = {this.props.thumbWidth}
                infiniteLoop = {this.props.infiniteLoop}
                selectedItem = {this.props.selectedItem}
                axis = {this.props.axis}
                // verticalSwipe = {this.props.verticalSwipe}
                // width = {this.props.width}
                useKeyboardArrows = {this.props.useKeyboardArrows}
                autoPlay = {this.props.autoPlay}
                stopOnHover = {this.props.stopOnHover}
                interval = {this.props.interval}
                transitionTime = {this.props.transitionTime}
                swipeScrollTolerance = {this.props.swipeScrollTolerance}
                // swipeable = {this.props.swipeable}
                dynamicHeight = {this.props.dynamicHeight}
                emulateTouch = {this.props.emulateTouch}
                centerMode = {this.props.centerMode}
                centerSlidePercentage = {this.props.centerSlidePercentage}
              >
            {this.state.listItemsCarousel.map((item, index) => (
              <div key={index++} >
              {/* <img src={this.prefix + item.FileLeafRef} alt={item.Tekst} /> */}
              <img src={item.Obrazek.Url} alt={item.Tekst} />
                <p className='legend'>
                  {item.Tekst}
                  <br />
                  <a target='_blank' href={item.Link.Url}>{item.Link.Description}</a>
                </p>
              </div>
            ))}
          </Carousel>
  )
}
