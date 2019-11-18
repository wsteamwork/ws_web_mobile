import {ClassNameMap} from '@material-ui/styles/withStyles';

export interface CustomClasses<T extends string = string> {
  customClasses?: Partial<ClassNameMap<T>>
}
