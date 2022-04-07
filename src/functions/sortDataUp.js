export default (data, sort) => {
    switch (sort) {
      case 'name':
        return data.sort((a, b) => {
          if (a.name.toLowerCase() > b.name.toLowerCase()) {
            return 1;
          } else if (a.name.toLowerCase() < b.name.toLowerCase()) {
            return -1;
          }
          return 0;
        });
      case 'surname':
        return data.sort((a, b) => {
          if (a.surname.toLowerCase() > b.surname.toLowerCase()) {
            return 1;
          } else if (a.surname.toLowerCase() < b.surname.toLowerCase()) {
            return -1;
          }
          return 0;
        });
      case 'email':
        return data.sort((a, b) => {
          if (a.email.toLowerCase() > b.email.toLowerCase()) {
            return 1;
          } else if (a.email.toLowerCase() < b.email.toLowerCase()) {
            return -1;
          }
          return 0;
        });
      case 'phone':
        return data.sort((a, b) => {
          if (a.phone > b.phone) {
            return 1;
          } else if (a.phone < b.phone) {
            return -1;
          }
          return 0;
        });
        case 'date' :
            return data.sort((a,b) => {
                let dateA = new Date(a.dateBirth), dateB = new Date(b.dateBirth);
                if (dateA > dateB) {
                    return 1
                } else if (dateA < dateB) {
                    return -1
                }
                return 0
            });
      default:
        return 0;
    }
  };