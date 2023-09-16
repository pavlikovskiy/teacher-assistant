'use client'
import { Button, Grid } from '@mui/material'
import styled from '@emotion/styled'
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
