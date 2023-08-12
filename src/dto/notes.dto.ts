import {IsBoolean, IsDefined, IsNotEmpty, IsString, MinLength, ValidateIf} from "class-validator";
import {Category} from "../types/categories.types";
import {storage} from "../utils/storage";
import {OneOf} from "../utils/custom-validator-constraints";

export class CreateNoteDto {

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  name: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  content: string;

  @IsDefined()
  @OneOf(storage.categories)
  category: Category

  @IsDefined()
  @IsBoolean()
  isArchived: boolean;
}

export class UpdateNoteDto {

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  name: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  content: string;

  @IsDefined()
  @OneOf(storage.categories)
  category: Category

  @IsDefined()
  @IsBoolean()
  isArchived: boolean;
}