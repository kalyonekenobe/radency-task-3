import {Controller, Get, HttpStatus, Param, ParseUUIDPipe, Post, Body, Res, Patch, Delete} from '@nestjs/common';
import {AppService} from '../../services/app.service';
import {Response} from "express";
import {CreateNoteDto, UpdateNoteDto} from "../../dto/notes.dto";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/notes')
  async getNotes(@Res() res: Response) {
    const notes = await this.appService.getNotes();
    return res.status(HttpStatus.OK).json(notes);
  }

  @Get('/notes/stats')
  async getNotesStats(@Res() res: Response){
    const notesStats = await this.appService.getNotesStats();
    return res.status(HttpStatus.OK).json(notesStats);
  }

  @Get('/notes/:id')
  async getNote(@Param('id', new ParseUUIDPipe()) id, @Res() res: Response) {
    try {
      const note = await this.appService.getNote(id);
      return res.status(HttpStatus.OK).json(note);
    } catch (error) {
      return res.status(HttpStatus.NOT_FOUND).json({ error: error.message });
    }
  }

  @Post('/notes')
  async createNote(@Body() body: CreateNoteDto, @Res() res: Response) {
    try {
      const createdNote = await this.appService.createNote(body);

      return res.status(HttpStatus.CREATED).json({ createdNote });
    } catch (error) {
      return res.status(HttpStatus.CONFLICT).json({ error: error.message });
    }
  }

  @Patch('/notes/:id')
  async updateNote(@Param('id', new ParseUUIDPipe()) id, @Body() body: UpdateNoteDto, @Res() res: Response) {
    try {
      const oldNote = await this.appService.getNote(id);
      const updatedNote = await this.appService.updateNote({ ...oldNote, ...body });

      return res.status(HttpStatus.OK).json({ oldNote, updatedNote });
    } catch (error) {
      return res.status(HttpStatus.CONFLICT).json({ error: error.message });
    }
  }

  @Delete('/notes/:id')
  async removeNote(@Param('id', new ParseUUIDPipe()) id, @Res() res: Response) {
    try {
      const deletedNote = await this.appService.removeNote(id);

      return res.status(HttpStatus.OK).json({ deletedNote });
    } catch (error) {
      return res.status(HttpStatus.CONFLICT).json({ error: error.message });
    }
  }
}
