import { Directive, EventEmitter, HostBinding, HostListener, Output } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

export interface FileHandle {
  file: File,
  url: SafeUrl
}

@Directive({
  selector: '[appDragDropFiles]'
})
export class DragDropFilesDirective {

  @Output() public files: EventEmitter<FileHandle[]> = new EventEmitter();
  @HostBinding('class.drag-drop-container') fileOver: boolean = false;

  constructor(private domSanitizer: DomSanitizer) { }

  @HostListener("dragover", ["$event"])
  public onDragOver(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
    this.fileOver = true;
  }

  @HostListener("dragleave", ["$event"])
  public onDragLeave(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
    this.fileOver = false;
  }

  @HostListener('drop', ['$event'])
  public onDrop(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
    this.fileOver = false;
    let files: FileHandle[] = [];
    console.log(evt);

    for (let i = 0; i < evt.dataTransfer!.files.length; i++) {
      const file = evt.dataTransfer!.files[i];
      const url = this.domSanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file));
      files.push({ file, url });
    }
    if (files.length > 0) {
      this.files.emit(files);
    }
  }
}
