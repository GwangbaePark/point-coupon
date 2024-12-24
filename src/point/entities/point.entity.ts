import { Entity, PrimaryGeneratedColumn,  Column} from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class Point {
  @PrimaryGeneratedColumn()
  id: number;
}
