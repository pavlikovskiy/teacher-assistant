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
} from '@mui/material'
import styled from '@emotion/styled'
import { UnitConversion } from '@/components/UnitConversion/UnitConversion'
import { useState } from 'react'
import {
  ConversionModel,
  ResponseTypeEnum,
  UnitConversionEnum,
  UnitConversionItemType,
} from '@/models/types'
import {
  conversionFunc,
  TemperatureConversionModel,
  UnitConversionModels,
} from '@/models/conversion'
import { grey } from '@mui/material/colors'

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

export const MeasureSection = styled(Grid)`
  padding: 15px 0 15px 0;
`

export const MeasureLabel = styled.span`
  //padding: 10px 10px 10px 0;
  color: ${grey[700]};
`
export const StyledMeasure = styled.span`
  padding: 10px 0 10px 10px;
  text-decoration: underline;
  color: ${grey[500]};
`

const unitOpts = [UnitConversionEnum.VOLUME, UnitConversionEnum.TEMPERATURE]

function UnitConversionPage() {
  const [unitConversion, setUnitConversion] = useState<UnitConversionEnum>(
    UnitConversionEnum.TEMPERATURE
  )
  const [conversionModel, setConversionModel] = useState<ConversionModel<any>>(
    TemperatureConversionModel
  )
  const [itemStatus, setItemStatus] = useState<ResponseTypeEnum>(
    ResponseTypeEnum.NO_ANSWER
  )
  const [itemStatusFinal, setItemStatusFinal] = useState<ResponseTypeEnum>(
    ResponseTypeEnum.NO_ANSWER
  )

  const handleUnitConversionChange = (event: SelectChangeEvent) => {
    setUnitConversion(event.target.value as UnitConversionEnum)
    const uc: UnitConversionEnum = event.target.value as UnitConversionEnum
    setConversionModel(UnitConversionModels.get(uc) || TemperatureConversionModel)
  }

  const onComplete = (unitConversionItem: UnitConversionItemType) => {
    const { inputValue, inputUnitOfMeasure, targetUnitOfMeasure, studentResponse } =
      unitConversionItem

    let unitConversionStatus
    try {
      const correctAnswer = conversionFunc(
        inputValue,
        inputUnitOfMeasure,
        targetUnitOfMeasure,
        conversionModel
      )
      console.log(`correctAnswer ${JSON.stringify(correctAnswer)}`)
      unitConversionStatus =
        `${correctAnswer}` === studentResponse
          ? ResponseTypeEnum.CORRECT
          : ResponseTypeEnum.INCORRECT
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
      <StyledHeader item xs={12}></StyledHeader>

      <Grid item xs={12}>
        <Box sx={{ minWidth: 60 }}>
          <FormControl fullWidth>
            <InputLabel id='demo-simple-select-label'>Unit Conversion</InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              value={unitConversion}
              label='Unit conversion'
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

      <MeasureSection item xs={12}>
        <MeasureLabel>Supported units of measure:</MeasureLabel>{' '}
        {conversionModel.measures.map((measure) => (
          <StyledMeasure key={measure}>{measure}</StyledMeasure>
        ))}
      </MeasureSection>

      <Grid item xs={12}>
        {unitConversion && conversionModel && (
          <UnitConversion
            unitConversionType={unitConversion}
            itemStatus={itemStatusFinal}
            onComplete={onComplete}
          />
        )}
      </Grid>
      {itemStatus !== ResponseTypeEnum.NO_ANSWER && (
        <Grid item xs={12} md={6}>
          <StyledResponse>Result: {itemStatus}</StyledResponse>
        </Grid>
      )}
      {itemStatus !== ResponseTypeEnum.NO_ANSWER && (
        <Grid item xs={12} md={6}>
          <StyledButton variant='outlined' onClick={onDoneClickHandler}>
            Done
          </StyledButton>
        </Grid>
      )}
    </StyledAppContainer>
  )
}

export default UnitConversionPage
