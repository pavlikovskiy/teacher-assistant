'use client'
import {
    Box,
    Button,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
} from "@mui/material";
import styled from "@emotion/styled";
import {UnitConversion} from "@/components/UnitConversion/UnitConversion";
import {useState} from "react";
import {
    ConversionModel,
    ResponseTypeEnum,
    UnitConversionEnum,
    UnitConversionItemType
} from "@/models/types";
import {TemperatureConversionModel, UnitConversionModels} from "@/models/conversion";

export const StyledAppContainer = styled(Grid)`
  padding-right: 15px;
  padding-left: 15px;
`

export const StyledHeader = styled(Grid)`
  padding: 15px;
`

export const StyledButton = styled(Button)`
  //padding-left: 15px;
`
export const StyledResponse = styled.div`
  //padding-right: 15px;
`

const unitOpts = [
    UnitConversionEnum.VOLUME,
    UnitConversionEnum.TEMPERATURE,
]

function UnitConversionPage() {

    const [unitConversion, setUnitConversion] = useState<UnitConversionEnum>(UnitConversionEnum.TEMPERATURE);
    const [conversionModel, setConversionModel] = useState<ConversionModel<any>>(TemperatureConversionModel);
    // const [unitConversionItem, setUnitConversionItem] = useState<UnitConversionItemType>();
    const [itemStatus, setItemStatus] = useState<ResponseTypeEnum>(ResponseTypeEnum.NO_ANSWER);
    const [itemStatusFinal, setItemStatusFinal] = useState<ResponseTypeEnum>(ResponseTypeEnum.NO_ANSWER);

    const handleUnitConversionChange = (event: SelectChangeEvent) => {
        setUnitConversion(event.target.value as UnitConversionEnum);
        const uc: UnitConversionEnum = event.target.value as UnitConversionEnum
        const cm: ConversionModel<any> = UnitConversionModels.get(uc) || TemperatureConversionModel
        setConversionModel(cm)
        // setUnitConversionItem(undefined)
    };

    const onComplete = (unitConversionItem: UnitConversionItemType) => {
        // console.log(` --- ${JSON.stringify(unitConversionItem)}`)
        const {inputValue, inputUnitOfMeasure, targetUnitOfMeasure, studentResponse} = unitConversionItem

        let unitConversionStatus;
        try {
            const correctAnswer = conversionModel.conversionFunc(inputValue, inputUnitOfMeasure, targetUnitOfMeasure)
            // console.log(`correctAnswer ${JSON.stringify(correctAnswer)}`)
            unitConversionStatus = `${correctAnswer}` === studentResponse ? ResponseTypeEnum.CORRECT : ResponseTypeEnum.INCORRECT
        } catch (e) {
            unitConversionStatus = ResponseTypeEnum.INVALID
        }
        // setUnitConversionItem(unitConversionItem)
        setItemStatus(unitConversionStatus)
    }

    const onDoneClickHandler = () => {
        setItemStatusFinal(itemStatus)
        setItemStatus(ResponseTypeEnum.NO_ANSWER)
    }

    return (
        <StyledAppContainer container spacing={1}>
            <StyledHeader item xs={12}>
                Welcome to Unit Conversion
            </StyledHeader>

            <Grid item xs={12}>
                <Box sx={{minWidth: 60}}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Unit Conversion</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={unitConversion}
                            label="Unit conversion"
                            onChange={handleUnitConversionChange}
                        >
                            {unitOpts.map((opt) => (
                                <MenuItem key={opt} value={opt}>
                                    Unit conversion for {opt}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
            </Grid>

            <Grid item xs={12} >
                {unitConversion && conversionModel &&
                  <UnitConversion unitConversionType={unitConversion} itemStatus={itemStatusFinal} onComplete={onComplete}/>}
            </Grid>
            {
                itemStatus !== ResponseTypeEnum.NO_ANSWER && (
                    <Grid item xs={12} md={6}>
                        <StyledResponse>
                            Result: {itemStatus}
                        </StyledResponse>
                    </Grid>
                )
            }
            {
                itemStatus !== ResponseTypeEnum.NO_ANSWER && (
                    <Grid item xs={12} md={6}>
                        <StyledButton
                            variant="outlined"
                            onClick={onDoneClickHandler}
                        >Done</StyledButton>
                    </Grid>
                )
            }


        </StyledAppContainer>
    )
}

export default UnitConversionPage
