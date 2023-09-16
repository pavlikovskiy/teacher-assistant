'use client'
import { Box, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import { UnitConversion } from '@/components/UnitConversion/UnitConversion'
import { useState } from 'react'
import { ConversionModel, ResponseTypeEnum, UnitConversionEnum, UnitConversionItemType } from '@/models/types'
import { conversionFunc, round, TemperatureConversionModel, UnitConversionModels } from '@/models/conversion'
import {
  MeasureLabel,
  MeasureSection,
  StyledAppContainer,
  StyledButton,
  StyledHeader,
  StyledMeasure,
  StyledResponse,
  StyledResponseContainer,
} from '@/containers/UnitConversionPage.styled'

const unitOpts = [UnitConversionEnum.VOLUME, UnitConversionEnum.TEMPERATURE]

const UnitConversionPage = () => {
  const [unitConversion, setUnitConversion] = useState<UnitConversionEnum>(UnitConversionEnum.TEMPERATURE)
  const [conversionModel, setConversionModel] = useState<ConversionModel<any>>(TemperatureConversionModel)
  const [itemStatus, setItemStatus] = useState<ResponseTypeEnum>(ResponseTypeEnum.NO_ANSWER)
  const [itemStatusFinal, setItemStatusFinal] = useState<ResponseTypeEnum>(ResponseTypeEnum.NO_ANSWER)

  const handleUnitConversionChange = (event: SelectChangeEvent) => {
    setUnitConversion(event.target.value as UnitConversionEnum)
    const uc: UnitConversionEnum = event.target.value as UnitConversionEnum
    setConversionModel(UnitConversionModels.get(uc) || TemperatureConversionModel)
    setItemStatus(ResponseTypeEnum.NO_ANSWER)
  }

  const onComplete = (unitConversionItem: UnitConversionItemType) => {
    const { inputValue, inputUnitOfMeasure, targetUnitOfMeasure, studentResponse } = unitConversionItem

    let unitConversionStatus
    try {
      const studentResponseNum = Number.parseFloat(studentResponse)
      const correctAnswer = conversionFunc(inputValue, inputUnitOfMeasure, targetUnitOfMeasure, conversionModel)
      unitConversionStatus = round(correctAnswer, 1) === round(studentResponseNum, 1) ? ResponseTypeEnum.CORRECT : ResponseTypeEnum.INCORRECT
    } catch (e) {
      unitConversionStatus = ResponseTypeEnum.INVALID
    }
    setItemStatus(unitConversionStatus)
  }

  const onDoneClickHandler = () => {
    setItemStatusFinal(itemStatus)
    setItemStatus(ResponseTypeEnum.NO_ANSWER)
  }

  return (
    <StyledAppContainer container spacing={1} sx={{ maxWidth: 600 }}>
      <StyledHeader item xs={12}></StyledHeader>

      <Grid item xs={12}>
        <Box sx={{ minWidth: 60, maxWidth: 500 }}>
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
          <UnitConversion conversionModel={conversionModel} itemStatus={itemStatusFinal} onComplete={onComplete} />
        )}
      </Grid>
      {itemStatus !== ResponseTypeEnum.NO_ANSWER && (
        <StyledResponseContainer item xs={12} md={8}>
          Response is: <StyledResponse status={itemStatus}>{itemStatus}</StyledResponse>
        </StyledResponseContainer>
      )}
      {itemStatus !== ResponseTypeEnum.NO_ANSWER && (
        <Grid item xs={12} md={3}>
          <StyledButton variant='outlined' onClick={onDoneClickHandler}>
            Done
          </StyledButton>
        </Grid>
      )}
    </StyledAppContainer>
  )
}

export default UnitConversionPage
