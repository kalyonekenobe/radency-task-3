export const DATE_REGEX: RegExp = /(((0?[1-9]|[12][0-9]|3[01])\/(0?[13578]|1[02])\/\d{4})|((0?[1-9]|[12][0-9]|30)\/(0?[469]|11)\/\d{4})|((0?[1-9]|1[0-9]|2[0-8])\/0?2\/\d{4})|((0?[1-9]|[12][0-9])\/0?2\/((\d{2}(04|08|[2468][048]|[13579][26]))|([02468][048]|[13579][26])00)))|(((0?[1-9]|[12][0-9]|3[01])\.(0?[13578]|1[02])\.\d{4})|((0?[1-9]|[12][0-9]|30)\.(0?[469]|11)\.\d{4})|((0?[1-9]|1[0-9]|2[0-8])\.0?2\.\d{4})|((0?[1-9]|[12][0-9])\.0?2\.((\d{2}(04|08|[2468][048]|[13579][26]))|([02468][048]|[13579][26])00)))|(((0?[1-9]|[12][0-9]|3[01])-(0?[13578]|1[02])-\d{4})|((0?[1-9]|[12][0-9]|30)-(0?[469]|11)-\d{4})|((0?[1-9]|1[0-9]|2[0-8])-0?2-\d{4})|((0?[1-9]|[12][0-9])-0?2-((\d{2}(04|08|[2468][048]|[13579][26]))|([02468][048]|[13579][26])00)))/g;