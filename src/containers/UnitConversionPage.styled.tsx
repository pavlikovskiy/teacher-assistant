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
`
export const StyledResponseContainer = styled(Grid)`
  margin: 20px 0 0 10px;
  color: ${grey[700]};
`

type StyledResponseProps = {
  status: string
}
export const StyledResponse = styled.span<StyledResponseProps>`
  color: ${(props) => (props.status === 'Incorrect' ? 'red' : props.status === 'Correct' ? 'green' : 'gray')};
  font-weight: bold;
`

export const MeasureSection = styled(Grid)`
  padding: 15px 0 15px 0;
`

export const MeasureLabel = styled.span`
  color: ${grey[700]};
`
export const StyledMeasure = styled.span`
  padding: 10px 0 10px 10px;
  text-decoration: underline;
  color: ${grey[500]};
`
