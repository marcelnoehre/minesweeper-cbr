import { Injectable } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { BehaviorSubject } from 'rxjs';
import { BreakpointEnum } from '../enum/breakpoint';

@Injectable({
	providedIn: 'root'
})
export class BreakpointService {
	// private _display: { [key: string]: any } = {
	// 	isHandset: false,
	// 	isHandsetLandscape: false,
	// 	isHandsetPortrait: false,
	// 	isLarge: false,
	// 	isMedium: false,
	// 	isSmall: false,
	// 	isTablet: false,
	// 	isTabletLandscape: false,
	// 	isTabletPortrait: false,
	// 	isWeb: false,
	// 	isWebLandscape: false,
	// 	isWebPortrait: false,
	// 	isXLarge: false,
	// 	isXSmall: false,
	// };
	private _responsiveClass: BehaviorSubject<string> = new BehaviorSubject<string>('');

	constructor(
		private _responsive: BreakpointObserver
	) {
		this._responsive.observe([
			Breakpoints.Handset,
			Breakpoints.HandsetLandscape,
			Breakpoints.HandsetPortrait,
			Breakpoints.Large,
			Breakpoints.Medium,
			Breakpoints.Small,
			Breakpoints.Tablet,
			Breakpoints.TabletLandscape,
			Breakpoints.TabletPortrait,
			Breakpoints.Web,
			Breakpoints.WebLandscape,
			Breakpoints.WebPortrait,
			Breakpoints.XLarge,
			Breakpoints.XSmall])
			.subscribe(result => {
				const breakpoints = result.breakpoints;
				if (breakpoints[Breakpoints.Handset]) {
					this._responsiveClass.next(BreakpointEnum.handset);
				} else if (breakpoints[Breakpoints.HandsetLandscape]) {
					this._responsiveClass.next(BreakpointEnum.handsetLandscape);
				} else if (breakpoints[Breakpoints.HandsetPortrait]) {
					this._responsiveClass.next(BreakpointEnum.handsetPortrait);
				} else if (breakpoints[Breakpoints.Large]) {
					this._responsiveClass.next(BreakpointEnum.large);
				} else if (breakpoints[Breakpoints.Medium]) {
					this._responsiveClass.next(BreakpointEnum.medium);
				} else if (breakpoints[Breakpoints.Small]) {
					this._responsiveClass.next(BreakpointEnum.small);
				} else if (breakpoints[Breakpoints.Tablet]) {
					this._responsiveClass.next(BreakpointEnum.tablet);
				} else if (breakpoints[Breakpoints.TabletLandscape]) {
					this._responsiveClass.next(BreakpointEnum.tabletLandscape);
				} else if (breakpoints[Breakpoints.TabletPortrait]) {
					this._responsiveClass.next(BreakpointEnum.tabletPortrait);
				} else if (breakpoints[Breakpoints.Web]) {
					this._responsiveClass.next(BreakpointEnum.web);
				} else if (breakpoints[Breakpoints.WebLandscape]) {
					this._responsiveClass.next(BreakpointEnum.webLandscape);
				} else if (breakpoints[Breakpoints.WebPortrait]) {
					this._responsiveClass.next(BreakpointEnum.webPortrait);
				} else if (breakpoints[Breakpoints.XLarge]) {
					this._responsiveClass.next(BreakpointEnum.xLarge);
				} else if (breakpoints[Breakpoints.XSmall]) {
					this._responsiveClass.next(BreakpointEnum.xSmall);
				}
			}
		)
	}

	get responsiveClass$() {
		return this._responsiveClass.asObservable();
	}
}