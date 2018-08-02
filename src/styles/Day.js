import styled from 'styled-components';

let fontSize= '1.5em';

export const DayDiv = styled.div`
display: inline-block;
padding: 0 1em 1em 1em;
&:not(:first-child){
  border-left: 1px solid black;
}
`;
DayDiv.displayName = 'DayDiv';

export const CalDate = styled.div`
font-size: ${fontSize};
`;
CalDate.displayName = 'CalDate';

export const DayOfWeek = styled.div`
font-size: ${fontSize};
`;
DayOfWeek.displayName = 'DayOfWeek';

export const Condition = styled.div`
font-size: ${fontSize};
img{
  width: 100%;
  height: auto;
}
`;
Condition.displayName = 'Condition';

export const High = styled.div`
font-size: ${fontSize};
`;
High.displayName = 'High';

export const Temp = styled.div`
font-size: ${fontSize};
`;
Temp.displayName = 'Temp';

export const Low = styled.div`
font-size: ${fontSize};
color: lightslategrey;
`;
Low.displayName = 'Low';