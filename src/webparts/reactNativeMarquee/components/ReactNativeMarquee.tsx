import * as React from 'react';
import styles from './ReactNativeMarquee.module.scss';
import { IReactNativeMarqueeProps } from './IReactNativeMarqueeProps';
import { escape } from '@microsoft/sp-lodash-subset';


export default class ReactNativeMarquee extends React.Component<IReactNativeMarqueeProps, {}> {
  public render(): React.ReactElement<IReactNativeMarqueeProps> {
    return (
      <p>
          AAA
          React-Image-Gallery
          react-animated-slider
      </p>
    );
  }
}

