import * as React from 'react';
import styles from './ReactCoverflow.module.scss';
import { IReactCoverflowProps } from './IReactCoverflowProps';
import { escape } from '@microsoft/sp-lodash-subset';

//https://www.npmjs.com/package/react-coverflow
import pnp from 'sp-pnp-js';
import Coverflow from 'react-coverflow';

export interface IReactCoverflowState {
  // Słabe typowanie
  listItemsCoverflow: any[];
}

const fn = function () {
  /* do your action */
  console.log('funkcja fn');
}

export default class ReactCoverflow extends React.Component<IReactCoverflowProps, IReactCoverflowState> {

  public state: IReactCoverflowState = {
    listItemsCoverflow: []
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
        this.setState({ listItemsCoverflow: items });
      });
  }

  public render(): React.ReactElement<IReactCoverflowProps> {

    const anyParameters: boolean = this.state.listItemsCoverflow.length > 0;
    console.log(this.state.listItemsCoverflow.length);
    console.log(anyParameters);

    return (
      <div>
        {
          anyParameters ? (
            this.displayCoverflow()
          ) : (
              <h3>Ustaw parametry web parta</h3>
            )
        }
      </div>
    );
  }

  private displayCoverflow = () => (
    // <Coverflow width="960" height="500"
    //   displayQuantityOfSide={2}
    //   navigation={false}
    //   enableScroll={true}
    //   clickable={true}
    //   enableHeading={this.props.enableHeading}
    //   active={0}
    // >

    <Coverflow width="960" height="500"
    displayQuantityOfSide={2}
    navigation={false}
    enableScroll={true}
    clickable={true}
    active={0}
  >
    <div
      onClick={() => fn()}
      onKeyDown={() => fn()}
      role="menuitem"
      // tabIndex="0"
    >
      <img
        src='image/path'
        alt='title or description'
        style={{
          display: 'block',
          width: '100%',
        }}
      />
    </div>
    {
        this.state.listItemsCoverflow.map((item, index) => (
          <img key={index++} src={this.prefix + item.FileLeafRef} alt={item.Tekst} data-action={item.Link.Url} />
        ))
      }
  </Coverflow>

  )
}
