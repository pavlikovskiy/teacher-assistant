'use client'
import {useEffect, useState} from 'react'
import styled from "@emotion/styled";
import {Button, Grid, TextField} from "@mui/material";

import {
    ResponseTypeEnum,
    UnitConversionEnum,
    UnitConversionItemType
} from "@/models/types";

export const StyledContainer = styled(Grid)`
  padding-right: 15px;
  padding-left: 15px;
`

type UnitConversionProps = {
    unitConversionType: UnitConversionEnum
    itemStatus: ResponseTypeEnum
    onComplete: (unitConversionItem: UnitConversionItemType) => void
}

export const UnitConversion = ({unitConversionType, itemStatus, onComplete}: UnitConversionProps) => {
    const [inputValue, setInputValue] = useState<number>()
    const [inputUnitOfMeasure, setInputUnitOfMeasure] = useState<string>('')
    const [targetUnitOfMeasure, setTargetUnitOfMeasure] = useState<string>('')
    const [studentResponse, setStudentResponse] = useState<string>('')
    useEffect(() => {
        setInputValue(0)
        setInputUnitOfMeasure('')
        setTargetUnitOfMeasure('')
        setStudentResponse('')

    }, [itemStatus])

    const validateOnClickHandler = () => {
        if (!Number.isNaN(inputValue) && inputUnitOfMeasure && targetUnitOfMeasure && studentResponse) {
            onComplete({
                inputValue: Number.isNaN(inputValue) ? 0 : inputValue as unknown as number,
                inputUnitOfMeasure,
                targetUnitOfMeasure,
                studentResponse
            })
        }
    }

    return (
        <StyledContainer container spacing={1}>
            <Grid item xs={12} md={6}>
                <TextField
                    required
                    type="number"
                    label="Numeric Input"
                    InputLabelProps={{ shrink: true }}
                    value={inputValue}
                    // helperText="Type in numerical value"
                    onChange={(e) => setInputValue(parseFloat(e.target.value))}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <TextField
                    required
                    label={`Input Unit of ${unitConversionType}`}
                    InputLabelProps={{ shrink: true }}
                    value={inputUnitOfMeasure}
                    // helperText="Type in Unit of Measure"
                    onChange={(e) => setInputUnitOfMeasure(e.target.value)}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <TextField
                    required
                    label={`Target Unit of ${unitConversionType}`}
                    InputLabelProps={{ shrink: true }}
                    value={targetUnitOfMeasure}
                    // helperText="Type in Unit of Measure"
                    onChange={(e) => setTargetUnitOfMeasure(e.target.value)}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <TextField
                    required
                    label="Student Response"
                    InputLabelProps={{ shrink: true }}
                    value={studentResponse}
                    defaultValue=""
                    // helperText="Type in Student Response"
                    onChange={(e) => setStudentResponse(e.target.value)}
                />
            </Grid>
            <Grid item xs={12}>
                <Button
                    variant="outlined"
                    onClick={validateOnClickHandler}
                >Validate</Button>
            </Grid>

        </StyledContainer>
    )
}

