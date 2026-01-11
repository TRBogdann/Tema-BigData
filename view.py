from abc import ABC, abstractmethod


class View(ABC):
    editOn: bool

    def show(self):
        if self.editOn:
            self._showEditMode()
        else:
            self._showNormalMode()

    @abstractmethod
    def _showEditMode(self):
        pass

    @abstractmethod
    def _showNormalMode(self):
        pass

    def syncData(self):
        self._updateData()
        self._deleteData()
        self._insertData()

    @abstractmethod
    def _insertData(self):
        pass

    @abstractmethod
    def _deleteData(self):
        pass

    @abstractmethod
    def _updateData(self):
        pass
