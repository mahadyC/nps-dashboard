import { useState } from "react";
import ScoreInfo from "./ScoreInfo";
import ChartData from "./ChartData";
import Responses from "./Responses";

export default function InfoModalsStateHolder(props) {
    const [showScoreInfoModal, setShowScoreInfoModal] = useState(false);
    const handleCloseScoreInfoModal = () => setShowScoreInfoModal(false);
	const handleShowScoreInfoModal = () => setShowScoreInfoModal(true);
	
    const [showChartDataInfoModal, setShowChartDataInfoModal] = useState(false);
	const handleCloseChartDataInfoModal = () => setShowChartDataInfoModal(false);
	const handleShowChartDataInfoModal = () => setShowChartDataInfoModal(true);

    const [showResponsesInfoModal, setShowResponsesInfoModal] = useState(false);
	const handleCloseResponsesInfoModal = () => setShowResponsesInfoModal(false);
	const handleShowResponsesInfoModal = () => setShowResponsesInfoModal(true);
   
    return (
		<div className="gridwrapper">
            <ScoreInfo filteredData={props.filteredData} show={showScoreInfoModal} handleClose={handleCloseScoreInfoModal} handleShow={handleShowScoreInfoModal}/>
            <ChartData filteredData={props.filteredData} show={showChartDataInfoModal} handleClose={handleCloseChartDataInfoModal} handleShow={handleShowChartDataInfoModal}/>
            <Responses filteredData={props.filteredData} show={showResponsesInfoModal} handleClose={handleCloseResponsesInfoModal} handleShow={handleShowResponsesInfoModal} />
		</div>
	);
}
