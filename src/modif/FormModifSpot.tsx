import { useState, ChangeEvent, SetStateAction, Dispatch } from "react"

import Box from "@mui/material/Box"
import FormControl from "@mui/material/FormControl"
import FormGroup from "@mui/material/FormGroup"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button/Button"
import Paper from "@mui/material/Paper/Paper"
import MenuItem from "@mui/material/MenuItem/MenuItem"
import Select, { SelectChangeEvent } from "@mui/material/Select/Select"
import InputLabel from "@mui/material/InputLabel/InputLabel"

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline"
import IconButton from "@mui/material/IconButton/IconButton"
import AddPhotoAlternateTwoToneIcon from "@mui/icons-material/AddPhotoAlternateTwoTone"
import SendIcon from "@mui/icons-material/Send"
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline"
import styled from "@mui/material/styles/styled"

import "./FormModifSpot.css"

const InputImage = styled("input")({
	display: "none",
})

export default function FormModifSpot(props: any) {
	const [continent, setContinent] = useState("")
	const [country, setCountry] = useState("")
	const [typeMap, setTypeMap] = useState("")

	const [name, setName] = useState("")
	const [capital, setCapital] = useState("")
	const [population, setPopulation] = useState("")
	const [surfaceArea, setSurfaceArea] = useState("")
	const [demonyms, setDemonyms] = useState([""])
	const [subAreas, setSubAreas] = useState<
		{
			name: string
			type: string
		}[]
	>([{ name: "", type: "" }])
	const [regionalLanguages, setRegionalLanguages] = useState([""])
	const [images, setImages] = useState<
		{ file: File | undefined; desc: string }[]
	>([{ file: undefined, desc: "" }])

	const [previewImages, setPreviewImages] = useState([""])

	// ====== Handle Input ====== //

	/**
	 * generic handle for string state after onChange of an input
	 *
	 * @param event
	 * @param setStateFunction
	 */
	const handleChangeStringState = (
		event:
			| ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
			| SelectChangeEvent<string>,
		setStateFunction: React.Dispatch<React.SetStateAction<string>>
	) => {
		setStateFunction(event.target.value)
	}

	/**
	 * generic handle for string[] state after onChange of an input
	 *
	 * @param event
	 * @param setStateFunction
	 * @param index
	 */
	const handleChangeArrayString = (
		event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
		setStateFunction: React.Dispatch<React.SetStateAction<string[]>>,
		index: number
	) => {
		setStateFunction((prev) =>
			prev.map((item, i) => (index !== i ? item : event.target.value))
		)
	}

	const handleChangeSubArea = (
		event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
		key: "name" | "type",
		index: number
	) => {
		setSubAreas((prev) =>
			prev.map((area, i) => {
				if (i !== index) return area
				else {
					area[key] = event.target.value
					return area
				}
			})
		)
	}

	const createBlobURL = (files: FileList | null) => {
		if (!files || files.length === 0) return ""
		return URL.createObjectURL(files[0])
	}

	const handleChangeImages = (
		event: ChangeEvent<HTMLInputElement>,

		key: "desc" | "img",
		index: number
	) => {
		console.log(event.target.files)
		setImages((prev) =>
			prev.map((img, i) => {
				if (i !== index) return img
				else {
					if (key === "img") {
						setPreviewImages((prev) =>
							prev.map((url, i) => {
								console.log(event)
								return index !== i ? url : createBlobURL(event.target.files)
							})
						)
						return img
					} else {
						img[key] = event.target.value
						return img
					}
				}
			})
		)
	}

	function removeGenericOneInListState(
		i: number,
		state: any[],
		setStateFunction: Dispatch<SetStateAction<any[]>>
	) {
		let newState: any[] = []
		state.map((item, index) => {
			if (i !== index) {
				newState.push(item)
				return state
			}
			return null
		})

		setStateFunction(newState)
	}

	return (
		<Box
			component="form"
			noValidate
			autoComplete="off"
			className="FormModifSpot"
		>
			<FormControl>
				<Paper elevation={24} id="spot-selectors">
					<FormControl>
						<InputLabel id="input-continent">Continent</InputLabel>
						<Select
							sx={{ minWidth: 120 }}
							labelId="input-continent"
							value={continent}
							label="Continent"
							onChange={(event) => {
								handleChangeStringState(event, setContinent)
							}}
						>
							<MenuItem value={"Europe"}>Europe</MenuItem>
						</Select>
					</FormControl>
					<FormControl>
						<InputLabel id="input-country">Country</InputLabel>
						<Select
							sx={{ minWidth: 120 }}
							labelId="input-country"
							value={country}
							label="Country"
							onChange={(event) => {
								handleChangeStringState(event, setCountry)
							}}
						>
							<MenuItem value={"France"}>France</MenuItem>
						</Select>
					</FormControl>
					<FormControl>
						<InputLabel id="input-typeMap">TypeMap</InputLabel>
						<Select
							sx={{ minWidth: 120 }}
							labelId="input-typeMap"
							value={typeMap}
							label="TypeMap"
							onChange={(event) => {
								handleChangeStringState(event, setTypeMap)
							}}
						>
							<MenuItem value={"Region"}>Region</MenuItem>
						</Select>
					</FormControl>
				</Paper>
				{/* =========== Spot Editor ============ */}
				<div id="simpleTextFeild">
					<FormGroup>
						<TextField
							id="Name"
							label="Name"
							value={name}
							onChange={(event: ChangeEvent<HTMLInputElement>) =>
								handleChangeStringState(event, setName)
							}
						/>
					</FormGroup>
					<FormGroup>
						<TextField
							id="Capital"
							label="Capital"
							value={capital}
							onChange={(event: ChangeEvent<HTMLInputElement>) =>
								handleChangeStringState(event, setCapital)
							}
						/>
					</FormGroup>
					<FormGroup>
						<TextField
							id="Population"
							label="Population"
							value={population}
							onChange={(event: ChangeEvent<HTMLInputElement>) =>
								handleChangeStringState(event, setPopulation)
							}
						/>
					</FormGroup>
					<FormGroup>
						<TextField
							id="surfaceArea"
							label="Surface Area (km)"
							value={surfaceArea}
							onChange={(event: ChangeEvent<HTMLInputElement>) =>
								handleChangeStringState(event, setSurfaceArea)
							}
						/>
					</FormGroup>
				</div>
				{/*  =========== denonyms =========== */}
				<FormGroup>
					{demonyms.map((demo, i) => {
						return (
							<TextField
								key={i}
								label="Demonym"
								onChange={(event: ChangeEvent<HTMLInputElement>) => {
									handleChangeArrayString(event, setDemonyms, i)
								}}
								value={demo}
							/>
						)
					})}
					<IconButton
						color="primary"
						sx={{ height: "40px" }}
						onClick={() =>
							setDemonyms((prev) => {
								return [...prev, "unknow"]
							})
						}
					>
						<AddCircleOutlineIcon color="primary" />
					</IconButton>
				</FormGroup>
				{/*  =========== subAreas =========== */}
				<FormGroup>
					{subAreas.map((area, i) => {
						return (
							<Paper key={i} className="form-image">
								<TextField
									label="Sub Area name"
									value={area.name}
									onChange={(event: ChangeEvent<HTMLInputElement>) => {
										handleChangeSubArea(event, "name", i)
									}}
								/>
								<TextField
									label="Sub Area type"
									value={area.type}
									onChange={(event: ChangeEvent<HTMLInputElement>) => {
										handleChangeSubArea(event, "type", i)
									}}
								/>
								{i > 0 && (
									<IconButton
										color="primary"
										sx={{ height: "40px" }}
										onClick={() => {
											removeGenericOneInListState(i, subAreas, setSubAreas)
										}}
									>
										<RemoveCircleOutlineIcon color="error" />
									</IconButton>
								)}
							</Paper>
						)
					})}
					<IconButton
						color="primary"
						sx={{ height: "40px" }}
						onClick={() =>
							setSubAreas((prev) => {
								return [...prev, { name: "", type: "" }]
							})
						}
					>
						<AddCircleOutlineIcon color="primary" />
					</IconButton>
				</FormGroup>
				{/*  =========== regionalLanguages =========== */}
				<FormGroup>
					{regionalLanguages.map((lang, i) => {
						return (
							<TextField
								key={i}
								label="Regional Languages"
								onChange={(event: ChangeEvent<HTMLInputElement>) => {
									handleChangeArrayString(event, setRegionalLanguages, i)
								}}
								value={lang}
							/>
						)
					})}
					<IconButton
						color="primary"
						sx={{ height: "40px" }}
						onClick={() =>
							setRegionalLanguages((prev) => {
								return [...prev, "unknow"]
							})
						}
					>
						<AddCircleOutlineIcon color="primary" />
					</IconButton>
				</FormGroup>
				{/*  =========== image =========== */}
				<FormGroup>
					{images.map((image, i) => {
						return (
							<Paper key={i} className="form-image">
								<TextField
									label="Image description"
									onChange={(event: ChangeEvent<HTMLInputElement>) => {
										handleChangeImages(event, "desc", i)
									}}
									value={image.desc}
								/>
								<label
									id={"add-photo-label" + i}
									style={{
										backgroundImage: "url('" + previewImages[i] + "')",
									}}
								>
									<InputImage
										accept="image/*"
										className="icon-button-file"
										type="file"
										onChange={(event: ChangeEvent<HTMLInputElement>) => {
											handleChangeImages(event, "img", i)
										}}
									/>
									<IconButton color="primary" component="span">
										<AddPhotoAlternateTwoToneIcon sx={{ fontSize: "50px" }} />
									</IconButton>
								</label>
								{i > 0 && (
									<IconButton
										color="primary"
										sx={{ height: "40px" }}
										onClick={() => {
											removeGenericOneInListState(i, images, setImages)
										}}
									>
										<RemoveCircleOutlineIcon color="error" />
									</IconButton>
								)}
							</Paper>
						)
					})}
					<IconButton
						color="primary"
						sx={{ height: "40px" }}
						onClick={() =>
							setImages((prev) => {
								return [...prev, { file: undefined, desc: "" }]
							})
						}
					>
						<AddCircleOutlineIcon color="primary" />
					</IconButton>
				</FormGroup>
			</FormControl>
			<Button
				id="button-submit"
				variant="contained"
				endIcon={<SendIcon />}
				onClick={(event) => {
					event.preventDefault()
					console.log(
						country,
						continent,
						typeMap,
						name,
						capital,
						population,
						surfaceArea,
						demonyms,
						subAreas,
						regionalLanguages,
						images
					)
				}}
			>
				Submit
			</Button>
		</Box>
	)
}
