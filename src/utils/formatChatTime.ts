import moment from "moment";

const formatChatTime = (dateTime: Date) => {
    const daysDiff = moment(Date.now()).diff(moment(dateTime), 'days');

    if (daysDiff == 0){
        return moment(dateTime).format("hh:mm A");
    } else if (daysDiff === 1){
        return "Yesterday";
    } else {
        return moment(dateTime).format("DD/MM/YYYY");
    }
}

export default formatChatTime;