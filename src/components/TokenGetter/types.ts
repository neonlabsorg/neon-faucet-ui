import {SPLToken} from "../../utils";

export type NotificatorData = {
  success: boolean
  details?: string
  token?: SPLToken | null
}
