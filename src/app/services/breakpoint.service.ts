import { Injectable } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { BehaviorSubject } from 'rxjs';
import { BreakpointEnum } from '../enum/breakpoint';
import { DisplayModeEnum } from '../enum/display-mode';

@Injectable({
	providedIn: 'root'
})
export class BreakpointService {
	private _display: { [key: string]: any } = {
		isHandset: false,
		isHandsetLandscape: false,
		isHandsetPortrait: false,
		isLarge: false,
		isMedium: false,
		isSmall: false,
		isTablet: false,
		isTabletLandscape: false,
		isTabletPortrait: false,
		isWeb: false,
		isWebLandscape: false,
		isWebPortrait: false,
		isXLarge: false,
		isXSmall: false,
	};
	private _responsiveClass: BehaviorSubject<String> = new BehaviorSubject<String>('');

	constructor(
		private responsive: BreakpointObserver,
	) {
		this.responsive.observe([
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
					this.displayMode(DisplayModeEnum.handset);
					this._responsiveClass.next(BreakpointEnum.handset);
				} else if (breakpoints[Breakpoints.HandsetLandscape]) {
					this.displayMode(DisplayModeEnum.handsetLandscape);
					this._responsiveClass.next(BreakpointEnum.handsetLandscape);
				} else if (breakpoints[Breakpoints.HandsetPortrait]) {
					this.displayMode(DisplayModeEnum.handsetPortrait);
					this._responsiveClass.next(BreakpointEnum.handsetPortrait);
				} else if (breakpoints[Breakpoints.Large]) {
					this.displayMode(DisplayModeEnum.large);
					this._responsiveClass.next(BreakpointEnum.large);
				} else if (breakpoints[Breakpoints.Medium]) {
					this.displayMode(DisplayModeEnum.medium);
					this._responsiveClass.next(BreakpointEnum.medium);
				} else if (breakpoints[Breakpoints.Small]) {
					this.displayMode(DisplayModeEnum.small);
					this._responsiveClass.next(BreakpointEnum.small);
				} else if (breakpoints[Breakpoints.Tablet]) {
					this.displayMode(DisplayModeEnum.tablet);
					this._responsiveClass.next(BreakpointEnum.tablet);
				} else if (breakpoints[Breakpoints.TabletLandscape]) {
					this.displayMode(DisplayModeEnum.tabletLandscape);
					this._responsiveClass.next(BreakpointEnum.tabletLandscape);
				} else if (breakpoints[Breakpoints.TabletPortrait]) {
					this.displayMode(DisplayModeEnum.tabletPortrait);
					this._responsiveClass.next(BreakpointEnum.tabletPortrait);
				} else if (breakpoints[Breakpoints.Web]) {
					this.displayMode(DisplayModeEnum.web);
					this._responsiveClass.next(BreakpointEnum.web);
				} else if (breakpoints[Breakpoints.WebLandscape]) {
					this.displayMode(DisplayModeEnum.webLandscape);
					this._responsiveClass.next(BreakpointEnum.webLandscape);
				} else if (breakpoints[Breakpoints.WebPortrait]) {
					this.displayMode(DisplayModeEnum.webPortrait);
					this._responsiveClass.next(BreakpointEnum.webPortrait);
				} else if (breakpoints[Breakpoints.XLarge]) {
					this.displayMode(DisplayModeEnum.xLarge);
					this._responsiveClass.next(BreakpointEnum.xLarge);
				} else if (breakpoints[Breakpoints.XSmall]) {
					this.displayMode(DisplayModeEnum.xSmall);
					this._responsiveClass.next(BreakpointEnum.xSmall);
				}
			}
		)
	}

	get responsiveClass$() {
		return this._responsiveClass.asObservable();
	}

	displayMode(mode: string) {
		for (let displaymode of Object.keys(this._display)) {
			if (displaymode == mode) {
				this._display[displaymode] = true;
				console.log(displaymode, ' = true');
			} else {
				this._display[displaymode] = false;
			}
		}
	}
}