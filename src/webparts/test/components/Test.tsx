import * as React from 'react';
import styles from './Test.module.scss';
import { ITestProps } from './ITestProps';
import { escape } from '@microsoft/sp-lodash-subset';

import pnp from 'sp-pnp-js';

export interface ITestwState {
  // Słabe typowanie
  listItems: any[];
}

export default class Test extends React.Component<ITestProps, ITestwState> {

  public state: ITestwState = {
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

  public render(): React.ReactElement<ITestProps> {

    const anyParameters: boolean = this.state.listItems.length > 0;
    console.log(this.state.listItems.length);
    console.log(anyParameters);

    return (
      <div>
        {
          anyParameters ? (
            this.displayTest()
          ) : (
              <h3>Ustaw parametry web parta</h3>
            )
        }
      </div>
    );
  }

  private displayTest = () => (
    <div>
      Test
      <table>
        {
        this.state.listItems.map((item, index) => (
          <tr key={index++}>
          <th>{this.prefix + item.FileLeafRef}</th>
          <th>{item.Tekst}</th>
          <th>{item.Link.Url}</th>
          </tr>
        ))
      }
      </table>
    </div>
  )
}
  // public render(): React.ReactElement<ITestProps> {
  //   return (
  //     <div className={ styles.test }>
  //       <div className={ styles.container }>
  //         <div className={ styles.row }>
  //           <div className={ styles.column }>
  //             <span className={ styles.title }>Welcome to SharePoint!</span>
  //             <p className={ styles.subTitle }>Customize SharePoint experiences using Web Parts.</p>
  //             <p className={ styles.description }>{escape(this.props.description)}</p>
  //             <a href="https://aka.ms/spfx" className={ styles.button }>
  //               <span className={ styles.label }>Learn more</span>
  //             </a>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }
