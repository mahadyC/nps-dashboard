import { useState } from "react";
import ScoreInfo from "./ScoreInfo";
import ChartData from "./ChartData";
import Responses from "./Responses";

export default function InfoModalsStateHolder(props) {
    const [showScoreInfoModal, setShowScoreInfoModal] = useState(false);
	const toggleScoreInfoModal = (showScoreInfoModal) => {
        showScoreInfoModal ? setShowScoreInfoModal(false) : setShowScoreInfoModal(true);
    }
    const [showChartDataInfoModal, setShowChartDataInfoModal] = useState(false);
    const toggleChartDataInfoModal = (showChartDataInfoModal) => {
        showChartDataInfoModal ? setShowChartDataInfoModal(false) : setShowChartDataInfoModal(true);
    }
    const [showResponsesInfoModal, setShowResponsesInfoModal] = useState(false);
    const toggleResponsesInfoModal = (showResponsesInfoModal) => {
        showResponsesInfoModal ? setShowResponsesInfoModal(false) : setShowResponsesInfoModal(true);
    }
    return (
		<div className="gridwrapper">
            <ScoreInfo filteredData={props.filteredData} show={showScoreInfoModal} toggleScoreInfoModal={toggleScoreInfoModal}/>
            <ChartData filteredData={props.filteredData} show={showChartDataInfoModal} toggleChartDataInfoModal={toggleChartDataInfoModal}/>
            <Responses filteredData={props.filteredData} show={showResponsesInfoModal} toggleResponsesInfoModal={toggleResponsesInfoModal}/>
		</div>
	);
}
