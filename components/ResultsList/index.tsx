import React from "react";
import { DataGrid, GridRenderCellParams } from "@mui/x-data-grid";
import css from "./ResultsList.module.css";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import { createStyles, makeStyles } from "@mui/styles";

interface GridCellExpandProps {
	value: string;
	width: number;
}

const useStyles = makeStyles(() =>
	createStyles({
		root: {
			alignItems: "center",
			lineHeight: "24px",
			width: "100%",
			height: "100%",
			position: "relative",
			display: "flex",
			"& .cellValue": {
				whiteSpace: "nowrap",
				overflow: "hidden",
				textOverflow: "ellipsis",
			},
		},
	})
);

function isOverflown(element: Element): boolean {
	return (
		element.scrollHeight > element.clientHeight ||
		element.scrollWidth > element.clientWidth
	);
}

const GridCellExpand = React.memo(function GridCellExpand(
	props: GridCellExpandProps
) {
	const { width, value } = props;
	const wrapper = React.useRef<HTMLDivElement | null>(null);
	const cellDiv = React.useRef(null);
	const cellValue = React.useRef(null);
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const classes = useStyles();
	const [showFullCell, setShowFullCell] = React.useState(false);
	const [showPopper, setShowPopper] = React.useState(false);

	const handleMouseEnter = () => {
		const isCurrentlyOverflown = isOverflown(cellValue.current!);
		setShowPopper(isCurrentlyOverflown);
		setAnchorEl(cellDiv.current);
		setShowFullCell(true);
	};

	const handleMouseLeave = () => {
		setShowFullCell(false);
	};

	React.useEffect(() => {
		if (!showFullCell) {
			return undefined;
		}

		function handleKeyDown(nativeEvent: KeyboardEvent) {
			if (nativeEvent.key === "Escape" || nativeEvent.key === "Esc") {
				setShowFullCell(false);
			}
		}

		document.addEventListener("keydown", handleKeyDown);

		return () => {
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, [setShowFullCell, showFullCell]);

	return (
		<div
			ref={wrapper}
			className={classes.root}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>
			<div
				ref={cellDiv}
				style={{
					height: 1,
					width,
					display: "block",
					position: "absolute",
					top: 0,
				}}
			/>
			<div ref={cellValue} className="cellValue">
				{value}
			</div>
			{showPopper && (
				<Popper
					open={showFullCell && anchorEl !== null}
					anchorEl={anchorEl}
					style={{ width, marginLeft: -17 }}
				>
					<Paper
						elevation={1}
						style={{ minHeight: wrapper.current!.offsetHeight - 3 }}
					>
						<div style={{ padding: "8px" }}>{value}</div>
					</Paper>
				</Popper>
			)}
		</div>
	);
});

function renderCellExpand(params: GridRenderCellParams<string>) {
	return (
		<GridCellExpand
			value={params.value || ""}
			width={params.colDef.computedWidth}
		/>
	);
}

interface Breach {
	id: BigInteger;
	Title: string;
	Domain: string;
	BreachDate: string;
	PwnCount: BigInteger;
	Description: string;
	IsVerified: boolean;
	IsFabricated: boolean;
	IsSensitive: boolean;
}

interface ResultsListProps {
	breaches: Array<Breach>;
}

export default class ResultsList extends React.Component<ResultsListProps> {
	render() {
		let { breaches } = this.props;

		const columns = [
			{
				field: "Title",
				headerName: "Title",
				width: 150,
				renderCell: renderCellExpand,
			},
			{
				field: "Domain",
				headerName: "Domain",
				width: 150,
				renderCell: renderCellExpand,
			},
			{
				field: "Description",
				headerName: "Description",
				type: "string",
				width: 400,
				disableColumnMenu: true,
				sortable: false,
				valueGetter: (params) => {
					return <div dangerouslySetInnerHTML={{ __html: params.value }}></div>;
				},
				renderCell: renderCellExpand,
			},
			{
				field: "BreachDate",
				headerName: "Date",
				type: "date",
				width: 110,
				valueGetter: (params) => {
					return new Date(params.value);
				},
				disableColumnMenu: true,
			},
			{
				field: "PwnCount",
				headerName: "# Records",
				type: "number",
				width: 160,
				disableColumnMenu: true,
			},
			{
				field: "DataClasses",
				headerName: "Data Exposed",
				sortable: false,
				width: 300,
				renderCell: renderCellExpand,
				valueGetter: (params) => {
					return params.value.join(", ");
				},
			},
			{
				field: "IsVerified",
				headerName: "Verified",
				type: "boolean",
				width: 120,
				disableColumnMenu: true,
			},
			{
				field: "IsFabricated",
				headerName: "Fabricated",
				type: "boolean",
				width: 130,
				disableColumnMenu: true,
			},
			{
				field: "IsSensitive",
				headerName: "Sensitive",
				type: "boolean",
				width: 140,
				disableColumnMenu: true,
			},
		];

		return (
			<div className={css["results-list"]}>
				<DataGrid columns={columns} rows={breaches} />
			</div>
		);
	}
}
