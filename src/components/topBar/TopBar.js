import React from "react";
import "./topBar.css";
import { NotificationsNone, Language, Settings } from "@material-ui/icons/";

export default function TopBar() {
	return (
		<div className="topbar">
			<div className="topbarWrapper">
				<div className="topLeft">
					<span className="logo">Logo</span>
				</div>
				<h1 className="title">NPS Dashboard</h1>
				<div className="topRight">
					<div className="topbarIconContainer">
						<NotificationsNone />
						<span className="topIconBadge">2</span>
					</div>
					<div className="topbarIconContainer">
						<Language />
						<span className="topIconBadge">2</span>
					</div>
					<div className="topbarIconContainer">
						<Settings />
					</div>
					<div className="topAvatar"></div>
				</div>
			</div>
		</div>
	);
}
