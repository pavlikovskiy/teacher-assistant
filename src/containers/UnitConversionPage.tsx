'use client'
import { Box, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import { UnitConversion } from '@/components/UnitConversion/UnitConversion'
import { useState } from 'react'
import { ConversionModel, ResponseTypeEnum, UnitConversionEnum, UnitConversionItemType } from '@/models/types'
import { conversionFunc, TemperatureConversionModel, UnitConversionModels } from '@/models/conversion'
import {
  MeasureLabel,
  MeasureSection,
  StyledAppContainer, StyledButton,
  StyledHeader,
  StyledMeasure, StyledResponse
} from "@/containers/UnitConversionPage.styled";

const unitOpts = [UnitConversionEnum.VOLUME, UnitConversionEnum.TEMPERATURE]

function UnitConversionPage() {
  const [unitConversion, setUnitConversion] = useState<UnitConversionEnum>(UnitConversionEnum.TEMPERATURE)
  const [conversionModel, setConversionModel] = useState<ConversionModel<any>>(TemperatureConversionModel)
  const [itemStatus, setItemStatus] = useState<ResponseTypeEnum>(ResponseTypeEnum.NO_ANSWER)
  const [itemStatusFinal, setItemStatusFinal] = useState<ResponseTypeEnum>(ResponseTypeEnum.NO_ANSWER)

  const handleUnitConversionChange = (event: SelectChangeEvent) => {
    setUnitConversion(event.target.value as UnitConversionEnum)
    const uc: UnitConversionEnum = event.target.value as UnitConversionEnum
    setConversionModel(UnitConversionModels.get(uc) || TemperatureConversionModel)
  }

  const onComplete = (unitConversionItem: UnitConversionItemType) => {
    const { inputValue, inputUnitOfMeasure, targetUnitOfMeasure, studentResponse } = unitConversionItem

    let unitConversionStatus
    try {
      const correctAnswer = conversionFunc(inputValue, inputUnitOfMeasure, targetUnitOfMeasure, conversionModel)
      console.log(`correctAnswer ${JSON.stringify(correctAnswer)}`)
      unitConversionStatus = `${correctAnswer}` === studentResponse ? ResponseTypeEnum.CORRECT : ResponseTypeEnum.INCORRECT
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
          <UnitConversion unitConversionType={unitConversion} itemStatus={itemStatusFinal} onComplete={onComplete} />
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
