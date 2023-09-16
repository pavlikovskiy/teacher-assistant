import { useEffect, useState } from 'react'
import { Button, Grid, TextField } from '@mui/material'

import { ConversionModel, ResponseTypeEnum, UnitConversionItemType } from '@/models/types'
import { StyledAutocomplete, StyledContainer } from './UnitConversion.styled'

type UnitConversionProps = {
  conversionModel: ConversionModel<any>
  itemStatus: ResponseTypeEnum
  onComplete: (unitConversionItem: UnitConversionItemType) => void
}

export const UnitConversion = ({ conversionModel, itemStatus, onComplete }: UnitConversionProps) => {
  const [inputValue, setInputValue] = useState<string>('')
  const [inputUnitOfMeasure, setInputUnitOfMeasure] = useState<string>('')
  const [targetUnitOfMeasure, setTargetUnitOfMeasure] = useState<string>('')
  const [studentResponse, setStudentResponse] = useState<string>('')
  const [validationDisabled, setValidationDisabled] = useState<boolean>(true)
  const unitConversionType = conversionModel.type
  const options = conversionModel.measures

  useEffect(() => {
    setInputValue('')
    setInputUnitOfMeasure('')
    setTargetUnitOfMeasure('')
    setStudentResponse('')
  }, [itemStatus, conversionModel])

  useEffect(() => {
    if (!Number.isNaN(inputValue) && inputUnitOfMeasure && targetUnitOfMeasure && studentResponse) {
      setValidationDisabled(false)
    } else {
      setValidationDisabled(true)
    }
  }, [inputValue, inputUnitOfMeasure, targetUnitOfMeasure, studentResponse])

  const validateOnClickHandler = () => {
    onComplete({
      inputValue: Number.isNaN(inputValue) ? 0 : Number.parseFloat(inputValue),
      inputUnitOfMeasure,
      targetUnitOfMeasure,
      studentResponse,
    })
  }

  return (
    <StyledContainer container spacing={1}>
      <Grid item xs={12} md={6}>
        <StyledAutocomplete
          id='input-measure'
          freeSolo
          options={options.map((option) => option)}
          value={inputUnitOfMeasure}
          onChange={(_, newValue) => {
            setInputUnitOfMeasure(newValue as string)
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              required
              label={`Input Unit of ${unitConversionType}`}
              InputLabelProps={{ shrink: true }}
              onChange={(e) => setInputUnitOfMeasure(e.target.value)}
            />
          )}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <StyledAutocomplete
          id='target-measure'
          freeSolo
          options={options.map((option) => option)}
          value={targetUnitOfMeasure}
          onChange={(_, newValue) => {
            setTargetUnitOfMeasure(newValue as string)
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              required
              label={`Target Unit of ${unitConversionType}`}
              InputLabelProps={{ shrink: true }}
              onChange={(e) => setTargetUnitOfMeasure(e.target.value)}
            />
          )}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          required
          label='Numeric Input'
          InputLabelProps={{ shrink: true }}
          value={inputValue}
          onChange={(e) => {
            if (e.target.value.match(/^-?\d*\.?\d*$/)) {
              setInputValue(e.target.value)
            }
          }}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          required
          label='Student Response'
          InputLabelProps={{ shrink: true }}
          value={studentResponse}
          onChange={(e) => setStudentResponse(e.target.value)}
        />
      </Grid>
      <Grid item xs={12}>
        <Button variant='outlined' disabled={validationDisabled} onClick={validateOnClickHandler}>
          Validate
        </Button>
      </Grid>
    </StyledContainer>
  )
}
