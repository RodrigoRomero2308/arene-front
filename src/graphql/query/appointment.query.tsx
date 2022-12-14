import { gql } from "@apollo/client";

export const GET_APPOINTMENTS_WITH_FILTER = gql`
  query getAppointments($filter: AppointmentFilter) {
    getAppointments(filter: $filter) {
      id
      treatment_id
      day_of_the_week
      start_hour
      end_hour
      treatment {
        id
        area_id
        patient_id
        patient {
          user {
            id
            firstname
            lastname
            email
          }
        }
      }
    }
  }
`;
